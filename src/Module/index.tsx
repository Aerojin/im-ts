import {
  MessageContentType,
  WKSDK,
  Channel,
  Message,
  MessageTask,
  Subscriber,
  Conversation,
} from "wukongimjssdk";
import React, { ElementType } from "react";
import { Howl } from "howler";
import WKApp from "../Service/WkApp";
import EmojiToolbar from "../Component/EmojiToolbar";
import ImageToolbar from "../Component/ImageToolbar";
import { GifCell, GifContent } from "../Component/Message/Gif";
import {
  HistorySplitCell,
  HistorySplitContent,
} from "../Component/Message/HistorySplit";
import ImageCell, { ImageContent } from "../Component/Message/Image";
import { SignalMessageCell } from "../Component/Message/SignalMessage/signalmessage";
import { SystemCell } from "../Component/Message/System";
import TextCell from "../Component/Message/Text";
import { TimeCell } from "../Component/Message/Time";
// import { UnknownCell } from "./Messages/Unknown";

// import { UnsupportCell, UnsupportContent } from "./Messages/Unsupport";
import {
  MessageContentTypeConst,
  GroupRole,
  EndpointID,
} from "../Utils/Constant";
import { DefaultEmojiService } from "../Service/EmojiService";

import { IModule } from "../Service/Module";
import {
  LottieSticker,
  LottieStickerCell,
} from "../Component/Message/LottieSticker";
import MergeforwardContent, {
  MergeforwardCell,
} from "../Component/Message/Mergeforward";
import APIClient from "../Service/APIClient";
import { Convert } from "../Utils/convert";
import { MediaMessageUploadTask } from "./task";

export default class BaseModule implements IModule {
  messageTone?: Howl;

  id(): string {
    return "base";
  }
  init(): void {
    console.log("【Module】初始化");
    APIClient.shared.logoutCallback = () => {
      WKApp.shared.logout();
    };

    WKApp.endpointManager.setMethod(
      EndpointID.emojiService,
      () => DefaultEmojiService.shared
    );

    WKApp.messageManager.registerMessageFactor(
      (contentType: number): ElementType | undefined => {
        switch (contentType) {
          case MessageContentType.text: // 文本消息
            return TextCell;
          case MessageContentType.image: // 图片消息
            return ImageCell;
          //   case MessageContentTypeConst.card: // 名片
          //     return CardCell;
          case MessageContentTypeConst.gif: // gif
            return GifCell;
          //   case MessageContentTypeConst.voice: // 语音
          //     return VoiceCell;
          case MessageContentTypeConst.mergeForward: // 合并转发
            return MergeforwardCell;
          //   case MessageContentTypeConst.smallVideo: // 小视频
          //     return VideoCell;
          case MessageContentTypeConst.historySplit: // 历史消息风格线
            return HistorySplitCell;
          case MessageContentTypeConst.time: // 时间消息
            return TimeCell;
          //   case MessageContentTypeConst.typing: // 输入中...
          //     return TypingCell;
          case MessageContentTypeConst.lottieSticker: // 动图
          case MessageContentTypeConst.lottieEmojiSticker:
            return LottieStickerCell;
          //   case MessageContentTypeConst.location: // 定位
          //     return LocationCell;
          //   case MessageContentTypeConst.screenshot:
          //     return ScreenshotCell;
          case MessageContentType.signalMessage: // 端对端加密错误消息
          case 98:
            return SignalMessageCell;
          default:
            if (contentType <= 2000 && contentType >= 1000) {
              return SystemCell;
            }
        }
      }
    );

    WKSDK.shared().register(MessageContentType.image, () => new ImageContent()); // 图片
    WKSDK.shared().register(
      MessageContentTypeConst.gif,
      () => new GifContent()
    ); // gif动图

    WKSDK.shared().register(
      MessageContentTypeConst.historySplit,
      () => new HistorySplitContent()
    ); // 历史分割线

    WKSDK.shared().register(
      MessageContentTypeConst.lottieSticker,
      () => new LottieSticker()
    ); // 动图
    WKSDK.shared().register(
      MessageContentTypeConst.lottieEmojiSticker,
      () => new LottieSticker()
    ); // 动图
    WKSDK.shared().register(
      MessageContentTypeConst.mergeForward,
      () => new MergeforwardContent()
    ); // 合并转发

    // 未知消息
    // WKApp.messageManager.registerCell(
    //   MessageContentType.unknown,
    //   (): ElementType => {
    //     return UnknownCell;
    //   }
    // );

    WKSDK.shared().chatManager.addCMDListener((message: Message) => {});

    this.registerChatToolbars(); // 注册聊天工具栏

    this.setSyncConversationsCallback();
    this.setSyncSubscribersCallback();
    this.setMessageReadedCallback();
    this.setMessageUploadTaskCallback(); // 消息上传任务
    this.setSyncMessageExtraCallback(); // 消息扩展
  }

  registerChatToolbars() {
    WKApp.endpoints.registerChatToolbar("chattoolbar.emoji", (ctx: any) => {
      return (
        <EmojiToolbar
          conversationContext={ctx}
          icon={require("../assets/toolbars/func_face_normal.svg").default}
        ></EmojiToolbar>
      );
    });

    // WKApp.endpoints.registerChatToolbar("chattoolbar.mention", (ctx) => {
    //   const channel = ctx.channel();
    //   if (channel.channelType === ChannelTypePerson) {
    //     return undefined;
    //   }
    //   return (
    //     <IconClick
    //       icon={require("./assets/toolbars/func_mention_normal.svg").default}
    //       onClick={() => {
    //         ctx.messageInputContext().insertText("@");
    //       }}
    //     ></IconClick>
    //   );
    // });
    // WKApp.endpoints.registerChatToolbar("chattoolbar.screenshot", (ctx) => {
    //   return (
    //     <IconClick
    //       icon={require("./assets/toolbars/func_screenshot.svg").default}
    //       onClick={() => {
    //         if ((window as any).__POWERED_ELECTRON__) {
    //           (window as any).ipc.send("screenshots-start", {});
    //         } else {
    //           window.open("https://www.snipaste.com");
    //         }
    //       }}
    //     ></IconClick>
    //   );
    // });
    WKApp.endpoints.registerChatToolbar("chattoolbar.image", (ctx) => {
      return (
        <ImageToolbar
          icon={require("../assets/toolbars/func_upload_image.svg").default}
          conversationContext={ctx}
        ></ImageToolbar>
      );
    });
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
      return conversations;
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
}
