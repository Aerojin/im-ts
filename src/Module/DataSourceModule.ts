// import { Convert, GroupRole, IModule, WKApp } from "@tsdaodao/base"
import {
  Channel,
  MessageTask,
  ChannelInfo,
  ChannelTypeGroup,
  ChannelTypePerson,
  Conversation,
  WKSDK,
  Message,
  Subscriber,
  ConversationAction,
  ConversationExtra,
  Reminder,
} from "wukongimjssdk";
import WKApp from "../Service/WkApp";
import { IModule } from "../Service/Module";
import { ConversationProvider } from "./Conversation";
import { ChannelDataSource, CommonDataSource } from "./DataSource";
import { GroupRole } from "../Utils/Constant";
import { Convert } from "../Utils/convert";
import { MediaMessageUploadTask } from "./task";
// import { connect } from "tls";

export default class DataSourceModule implements IModule {
  conversations: any[] = [];
  onConversationListener: any = null;
  constructor(props: any) {
    this.onConversationListener = props.onConversationListener;

    console.log('---DataSourceModule----init---', props);
  }

  id(): string {
    return "DataSource";
  }
  init(): void {
    console.log("【DataSourceModule】初始化");

    WKApp.conversationProvider = new ConversationProvider();

    WKApp.dataSource.channelDataSource = new ChannelDataSource();
    WKApp.dataSource.commonDataSource = new CommonDataSource();

    this.setSyncConversationsCallback(); // 最近会话
    this.setSyncSubscribersCallback(); // 订阅者同步
    this.setMessageReadedCallback(); // 消息已读未读
    this.setMessageUploadTaskCallback(); // 消息上传任务
    this.setSyncMessageExtraCallback(); // 消息扩展
    this.setChannelInfoCallback(); // 频道信息
    this.setConversationListener(); //最近会话监听
    // this.setSyncConversationExtrasCallback() // 最近会话扩展
    // this.setSyncRemindersCallback() // 同步提醒
    // this.setReminderDoneCallback() // 提醒项完成
  }

  setChannelInfoCallback() {
    WKSDK.shared().config.provider.channelInfoCallback = async function (
      channel: Channel
    ): Promise<ChannelInfo> {
      let channelInfo = new ChannelInfo(),
        isUsers = channel.channelType === ChannelTypePerson;
      const resp = await WKApp.apiClient.get(
        `channels/${channel.channelID}/${channel.channelType}`
      );

      const data = resp;

      channelInfo.channel = new Channel(
        data.channel.channel_id,
        data.channel.channel_type
      );
      channelInfo.title = data.name;
      channelInfo.mute = data.mute === 1;
      channelInfo.top = data.stick === 1;
      channelInfo.online = data.online === 1;
      channelInfo.lastOffline = data.last_offline;
      channelInfo.logo = data.logo;
      if (!channelInfo.logo || channelInfo.logo === "") {
        if (channel.channelType === ChannelTypePerson) {
          channelInfo.logo = `users/${channel.channelID}/avatar`;
        } else if (channel.channelType === ChannelTypeGroup) {
          channelInfo.logo = `groups/${channel.channelID}/avatar`;
        }
      }

      channelInfo.orgData = data.extra || {};
      channelInfo.orgData.remark = data.remark ?? "";
      channelInfo.orgData.displayName =
        data.remark && data.remark !== "" ? data.remark : channelInfo.title;

      channelInfo.orgData.receipt = data.receipt;
      channelInfo.orgData.robot = data.robot;
      channelInfo.orgData.status = data.status;
      channelInfo.orgData.follow = data.follow;
      channelInfo.orgData.category = data.category;
      channelInfo.orgData.be_deleted = data.be_deleted;
      channelInfo.orgData.be_blacklist = data.be_blacklist;
      channelInfo.orgData.notice = data.notice;

      if (channel.channelType === ChannelTypePerson) {
        channelInfo.orgData.shortNo = data.extra.short_no ?? "";
      } else if (channel.channelType === ChannelTypeGroup) {
        channelInfo.orgData.forbidden = data.forbidden;
        channelInfo.orgData.invite = data.invite;
        channelInfo.orgData.forbiddenAddFriend =
          data.extra.forbidden_add_friend;
        channelInfo.orgData.save = data.save;
      }
      if (data.category === "system" || data.category === "customerService") {
        // 官方账号
        channelInfo.orgData.identityIcon = "./identity_icon/official.png";
        channelInfo.orgData.identitySize = { width: "18px", height: "18px" };
      } else if (data.category === "visitor") {
        channelInfo.orgData.identityIcon = "./identity_icon/visitor.png";
        channelInfo.orgData.identitySize = { width: "48px", height: "24px" };
      }

      return channelInfo;
    };
  }

  setSyncSubscribersCallback() {
    WKSDK.shared().config.provider.syncSubscribersCallback = async function (
      channel: Channel,
      version: number
    ): Promise<Array<Subscriber>> {
      const resp = await WKApp.apiClient.get(
        `groups/${channel.channelID}/membersync?version=${version}&limit=10000`
      );
      let members = [];
      if (resp) {
        for (let i = 0; i < resp.length; i++) {
          let memberMap = resp[i];
          let member = new Subscriber();
          member.uid = memberMap.uid;
          member.name = memberMap.name;
          member.remark = memberMap.remark;
          member.role = memberMap.role;
          member.version = memberMap.version;
          member.isDeleted = memberMap.is_deleted;
          member.status = memberMap.status;
          member.orgData = memberMap;
          member.avatar = WKApp.shared.avatarUser(member.uid);
          members.push(member);
        }
      }
      members.sort((a, b) => {
        var roleA = a.role === GroupRole.owner ? 999 : a.role;
        var roleB = b.role === GroupRole.owner ? 999 : b.role;
        return roleB - roleA;
      });
      return members;
    };
  }

  setMessageUploadTaskCallback() {
    // 消息上传任务
    WKSDK.shared().config.provider.messageUploadTaskCallback = (
      message: Message
    ): MessageTask => {
      return new MediaMessageUploadTask(message);
    };
  }

  setSyncConversationExtrasCallback() {
    WKSDK.shared().config.provider.syncConversationExtrasCallback = async (
      version: number
    ) => {
      let conversationExtras = new Array<ConversationExtra>();
      const results = await WKApp.apiClient.post("conversation/extra/sync", {
        version: version,
      });
      if (results) {
        for (const result of results) {
          const channel = new Channel(
            result["channel_id"],
            result["channel_type"]
          );
          conversationExtras.push(Convert.toConversationExtra(channel, result));
        }
      }
      return conversationExtras;
    };
  }

  setSyncMessageExtraCallback() {
    WKSDK.shared().config.provider.syncMessageExtraCallback = async (
      channel: Channel,
      extraVersion: number,
      limit: number
    ) => {
      return WKApp.conversationProvider.syncMessageExtras(
        channel,
        extraVersion,
        limit
      );
    };
  }

  setSyncRemindersCallback() {
    WKSDK.shared().config.provider.syncRemindersCallback = async (
      version: number
    ) => {
      let reminders = new Array<Reminder>();
      const channelIDs = new Array<string>();
      const conversations = WKSDK.shared().conversationManager.conversations;
      if (conversations && conversations.length > 0) {
        for (const conversation of conversations) {
          if (conversation.channel.channelType === ChannelTypeGroup) {
            channelIDs.push(conversation.channel.channelID);
          }
        }
      }
      const results = await WKApp.apiClient.post("message/reminder/sync", {
        version: version,
        limit: 100,
        channel_ids: channelIDs,
      });
      if (results) {
        for (const result of results) {
          reminders.push(Convert.toReminder(result));
        }
      }
      return reminders;
    };
  }

  setReminderDoneCallback() {
    WKSDK.shared().config.provider.reminderDoneCallback = async (
      ids: number[]
    ) => {
      return WKApp.apiClient.post("message/reminder/done", ids);
    };
  }

  setMessageReadedCallback() {
    WKSDK.shared().config.provider.messageReadedCallback = async (
      channel: Channel,
      messages: Message[]
    ) => {
      const messageIDs = [];
      if (messages && messages.length > 0) {
        for (const message of messages) {
          messageIDs.push(message.messageID);
        }
      }
      return WKApp.apiClient
        .post("message/readed", {
          channel_id: channel.channelID,
          channel_type: channel.channelType,
          message_ids: messageIDs,
        })
        .catch((err) => {
          console.log("消息已读未读上报失败！", err);
        });
    };
  }

  setSyncConversationsCallback() {
    WKSDK.shared().config.provider.syncConversationsCallback = async (
      filter?: any
    ): Promise<Array<Conversation>> => {
      let resp: any;
      let conversations = new Array<Conversation>();
      resp = await WKApp.apiClient.post("conversation/sync", { msg_count: 1 });
      if (resp) {
        resp.conversations.forEach((conversationMap: any) => {
          let model = Convert.toConversation(conversationMap);
          conversations.push(model);
        });

        const users = resp.users;
        if (users && users.length > 0) {
          for (const user of users) {
            WKSDK.shared().channelManager.setChannleInfoForCache(
              Convert.userToChannelInfo(user)
            );
          }
        }
        const groups = resp.groups;
        if (groups && groups.length > 0) {
          for (const group of groups) {
            WKSDK.shared().channelManager.setChannleInfoForCache(
              Convert.groupToChannelInfo(group)
            );
          }
        }
      }
      if (conversations && conversations.length > 0) {
        this.conversations = conversations;
      }

      return conversations;
    };
  }

  setConversationListener() {
    const conversationListener = (
      conversation: Conversation,
      action: ConversationAction
    ) => {
      const channelInfo = WKSDK.shared().channelManager.getChannelInfo(
        conversation.channel
      );
      if (!channelInfo) {
        WKSDK.shared().channelManager.fetchChannelInfo(conversation.channel);
      }

      if (action === ConversationAction.update) {
        console.log("ConversationAction-----update", conversation);
        const existConversation = this.findConversation(conversation.channel);
        // 更新未读消息数量
        existConversation.unread++;
        this.conversations[0] = existConversation;

        if (
          this.onConversationListener &&
          typeof this.onConversationListener === "function"
        ) {
          this.onConversationListener({
            success: true,
            count: existConversation.unread,
            message: "success",
          });
        }
      }
    };

    // 监听消息，用于小红点
    WKSDK.shared().conversationManager.addConversationListener(
      conversationListener
    );
  }

  findConversation(channel: Channel) {
    if (this.conversations) {
      for (const conversation of this.conversations) {
        if (conversation.channel.isEqual(channel)) {
          return conversation;
        }
      }
    }
  }
}
