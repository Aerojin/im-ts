import mitt from "mitt";
import {
  Channel,
  ChannelTypeGroup,
  ChannelTypePerson,
  WKSDK,
  Message,
  ConnectStatus,
  ConnectAddrCallback,
} from "wukongimjssdk";
import APIClient from "./APIClient";
import { ProviderListener } from "./Provider";
import StorageService from "./StorageService";
import { DefaultEmojiService, EmojiService } from "./EmojiService";
import { DataSource } from "./DataSource/DataSource";
import { IConversationProvider } from "./DataSource/DataProvider";
import MessageManager from "./MessageManager";
import { EndpointCommon } from "./EndpointCommon";
import { EndpointManager, ModuleManager, IModule } from './Module';
import { WKBaseContext } from "../Component/WKBase";

export class WKConfig {
  appName: string = "唐僧叨叨";
  appVersion: string = "0.0.0"; // app版本
  themeColor: string = "#E46342"; // 主题颜色
  secondColor: string = "rgba(232, 234, 237)";
  pageSize: number = 15; // 数据页大小
  pageSizeOfMessage: number = 30; // 每次请求消息数量
  fileHelperUID: string = "fileHelper"; // 文件助手UID
  systemUID: string = "u_10000"; // 系统uid

  // 公共资源地址
  get publicUrl() {
    console.log("process.env.publicUrl ---->", process.env.PUBLIC_URL);
    return process.env.publicUrl || "";
  }
}

export class WKRemoteConfig {
  revokeSecond: number = 2 * 60; // 撤回时间
  requestSuccess: boolean = false;

  async startRequestConfig() {
    await this.requestConfig();

    if (!this.requestSuccess) {
      setTimeout(() => {
        this.startRequestConfig();
      }, 3000);
    }
  }

  requestConfig() {
    return WKApp.apiClient.get("common/appconfig").then((result) => {
      this.requestSuccess = true;
      this.revokeSecond = result["revoke_second"];
    });
  }
}

export type MessageDeleteListener = (
  message: Message,
  preMessage?: Message
) => void;

export class LoginInfo {
  appID!: string;
  shortNo!: string; // 短号
  token?: string;
  uid?: string;
  name: string | undefined;
  role!: string;
  isWork!: boolean;
  sex!: number;

  /**
   * save 保存登录信息
   */
  public save() {
    this.setStorageItemForSID("app_id", this.appID ?? "");
    this.setStorageItemForSID("short_no", this.shortNo ?? "");
    this.setStorageItemForSID("uid", this.uid ?? "");
    this.setStorageItemForSID("token", this.token ?? "");
    this.setStorageItemForSID("name", this.name ?? "");
    this.setStorageItemForSID("role", this.role ?? "");
    this.setStorageItemForSID("is_work", this.isWork ? "1" : "0");
    this.setStorageItemForSID("sex", this.sex == 1 ? "1" : "0");
  }

  // 获取查询参数
  public getQueryVariable(variable: string) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  }

  public setStorageItemForSID(key: string, value: string) {
    let sid = this.getSID();

    this.setStorageItem(key + sid, value);
  }

  public getStorageItemForSID(key: string): string | null {
    let sid = this.getSID();
    return this.getStorageItem(key + sid);
  }

  public removeStorageItemForSID(key: string) {
    let sid = this.getSID();
    this.removeStorageItem(key + sid);
  }

  public getSID(): string {
    let sid = this.getQueryVariable("sid") || "";
    return sid;
  }

  public setStorageItem(key: string, value: string) {
    StorageService.shared.setItem(key, value);
  }
  public getStorageItem(key: string): string | null {
    return StorageService.shared.getItem(key);
  }
  public removeStorageItem(key: string) {
    StorageService.shared.removeItem(key);
  }

  /**
   * load 加载登录信息
   */
  public load() {
    this.uid = this.getStorageItemForSID("uid") || "";
    this.shortNo = this.getStorageItemForSID("short_no") || "";
    this.token = this.getStorageItemForSID("token") || "";
    this.name = this.getStorageItemForSID("name") || "";
    this.appID = this.getStorageItemForSID("app_id") || "";
    this.role = this.getStorageItemForSID("role") || "";
    const isWorkStr = this.getStorageItemForSID("is_work");
    if (isWorkStr === "1") {
      this.isWork = true;
    } else {
      this.isWork = false;
    }

    const sexStr = this.getStorageItemForSID("sex");
    if (sexStr === "1") {
      this.sex = 1;
    } else {
      this.sex = 0;
    }
  }
  // 是否登录
  isLogined() {
    if (!this.token || this.token === "") {
      return false;
    }
    return true;
  }
  logout() {
    this.token = undefined;
    this.appID = "";
    this.role = "";
    this.removeStorageItem("token");
    this.removeStorageItem("app_id");
    this.removeStorageItem("role");
    this.removeStorageItem("is_work");
  }
}

export default class WKApp extends ProviderListener {
  private constructor() {
    super();
  }
  public static shared = new WKApp();
  static apiClient = APIClient.shared; // api客户端
  static config: WKConfig = new WKConfig(); // app配置
  static remoteConfig: WKRemoteConfig = new WKRemoteConfig(); // 远程配置
  static loginInfo: LoginInfo = new LoginInfo(); // 登录信息
  static endpoints: EndpointCommon = new EndpointCommon(); // 常用端点
  static conversationProvider: IConversationProvider; // 最近会话相关数据源
  static messageManager: MessageManager = new MessageManager(); // 消息管理
  static emojiService: EmojiService = DefaultEmojiService.shared; // emoji
  static dataSource: DataSource = new DataSource(); // 数据源
  static endpointManager: EndpointManager = EndpointManager.shared; // 端点管理
  static mittBus = mitt();
  private messageDeleteListeners: MessageDeleteListener[] =
    new Array<MessageDeleteListener>(); // 消息删除监听
  notSupportForward: number[] = []; // 不支持转发的消息
  openChannel?: Channel; // 当前打开的会话频道
  content?: JSX.Element;

  baseContext!: WKBaseContext; // 唐僧叨叨基础上下文

  private _notificationIsClose: boolean = false; // 通知是否关闭

  private wsaddrs = new Array<string>(); // ws的连接地址
  private addrUsed = false; // 地址是否被使用

  // app启动
  startup() {
    //  WKApp.loginInfo.load(); // 加载登录信息

    WKSDK.shared().config.provider.connectAddrCallback = async (
      callback: ConnectAddrCallback
    ) => {
      if (!this.wsaddrs || this.wsaddrs.length == 0) {
        this.wsaddrs = await WKApp.dataSource.commonDataSource.imConnectAddrs();
      }

      if (this.wsaddrs.length > 0) {
        console.log("connectAddrs--->", this.wsaddrs);
        this.addrUsed = true;
        callback(this.wsaddrs[0]);
      }
    };

    WKSDK.shared().connectManager.addConnectStatusListener(
      (status: ConnectStatus, reasonCode?: number) => {
        if (status === ConnectStatus.ConnectKick) {
          console.log("被踢--->", reasonCode);
          WKApp.shared.logout();
        } else if (reasonCode === 2) {
          // 认证失败！
          WKApp.shared.logout();
        } else if (status === ConnectStatus.Disconnect) {
          if (this.addrUsed && this.wsaddrs.length > 1) {
            const oldwsAddr = this.wsaddrs[0];
            this.wsaddrs.splice(0, 1);
            this.wsaddrs.push(oldwsAddr);
            this.addrUsed = false;
            console.log("连接失败！切换地址->", this.wsaddrs);
          }
        }
      }
    );

    // 用户登录
    this.login();

    // 通知设置
    const notificationIsClose = StorageService.shared.getItem(
      "NotificationIsClose"
    );
    if (notificationIsClose === "1") {
      this._notificationIsClose = true;
    } else {
      this._notificationIsClose = false;
    }

    WKApp.remoteConfig.startRequestConfig();
  }

  getChannel(): Channel {
    // WKApp.shared.openChannel = new Channel(
    //   "41fd143a21b94500a66e4e327fb92d7b",
    //   2
    // );

    WKApp.shared.openChannel = new Channel(
      "wangkm_group",
      2
    );

    return WKApp.shared.openChannel
  }

  startMain() {
    this.connectIM();
  }

  connectIM() {
    WKSDK.shared().config.uid = WKApp.loginInfo.uid;
    WKSDK.shared().config.token = WKApp.loginInfo.token;
    // WKSDK.shared().connect();
    WKSDK.shared().connectManager.connect();

    WKSDK.shared().config.provider.syncConversationsCallback();
  }

  registerModule(module: IModule) {
    ModuleManager.shared.register(module);
  }

  restContent(content: JSX.Element) {
    this.content = content;
    this.notifyListener();
  }

  // 登录
  login() {
    if (this.isLogined()) {
      console.log("--已经登录，加载登录信息--");
      WKApp.loginInfo.load(); // 加载登录信息
      this.startMain();
      return;
    }

    const _this = this;
    // const username: string = "008615900000002";
    const username: string = "0086" + "13306509966";
    const password: string = "12345678";
    // const password: string = "a1234567";

    WKApp.dataSource.commonDataSource
      .requestLoginWithUsernameAndPwd(username, password)
      .then((data: any) => {
        console.log('---登录成功---', data);
        const loginInfo = WKApp.loginInfo;

        loginInfo.appID = data.app_id;
        loginInfo.uid = data.uid;
        loginInfo.shortNo = data.short_no;
        loginInfo.token = data.token;
        loginInfo.name = data.name;
        loginInfo.sex = data.sex;
        loginInfo.save();

        WKApp.loginInfo.load();

        _this.startMain();
      });
  }

  // 是否登录
  isLogined() {
    return WKApp.loginInfo.isLogined();
  }

  // 登出
  logout() {
    WKApp.loginInfo.logout();
    // window.location.reload();
  }

  avatarChannel(channel: Channel) {
    if (!channel) {
      return "";
    }
    let avatarTag = this.getChannelAvatarTag(channel);
    const channelInfo = WKSDK.shared().channelManager.getChannelInfo(channel);
    if (channelInfo && channelInfo.logo && channelInfo.logo !== "") {
      let logo = channelInfo.logo;
      if (logo.indexOf("?") != -1) {
        logo += "&v=" + avatarTag;
      } else {
        logo += "?v=" + avatarTag;
      }
      return WKApp.dataSource.commonDataSource.getImageURL(logo);
    }
    const baseURl = WKApp.apiClient.config.apiURL;
    if (channel.channelType === ChannelTypePerson) {
      return `${baseURl}users/${channel.channelID}/avatar?v=${avatarTag}`;
    } else if (channel.channelType == ChannelTypeGroup) {
      return `${baseURl}groups/${channel.channelID}/avatar?v=${avatarTag}`;
    }
    return "";
  }

  avatarUser(uid: string) {
    const c = new Channel(uid, ChannelTypePerson);
    return this.avatarChannel(c);
  }

  getChannelAvatarTag(channel?: Channel) {
    let myAvatarTag = "channelAvatarTag";
    if (channel) {
      myAvatarTag = `channelAvatarTag:${channel.channelType}${channel.channelID}`;
    }
    const tag = WKApp.loginInfo.getStorageItem(myAvatarTag);
    if (!tag) {
      return "";
    }
    return tag;
  }

  public addMessageDeleteListener(listener: MessageDeleteListener) {
    this.messageDeleteListeners.push(listener);
  }
  public removeMessageDeleteListener(listener: MessageDeleteListener) {
    const len = this.messageDeleteListeners.length;
    for (let i = 0; i < len; i++) {
      if (listener === this.messageDeleteListeners[i]) {
        this.messageDeleteListeners.splice(i, 1);
        return;
      }
    }
  }
  public notifyMessageDeleteListener(message: Message, preMessage?: Message) {
    const len = this.messageDeleteListeners.length;
    for (let i = 0; i < len; i++) {
      this.messageDeleteListeners[i](message, preMessage);
    }
  }
}
