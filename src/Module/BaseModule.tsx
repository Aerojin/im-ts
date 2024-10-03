import {
  MessageContentType,
  WKSDK,
  Message,
  ChannelInfo,
  MessageText,
  ChannelTypePerson,
  ChannelTypeGroup,
} from "wukongimjssdk";
import React, { ElementType } from "react";
import { Howl } from "howler";
import { message as Toast } from 'antd';
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
import { UnknownCell } from "../Component/Message/Unknown";
import {
  UnsupportCell,
  UnsupportContent,
} from "../Component/Message/Unsupport";
import {
  GroupRole,
  EndpointID,
  unsupportMessageTypes,
  MessageContentTypeConst,
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
import { getI18nText } from '../i18n';

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
    WKApp.messageManager.registerCell(
      MessageContentType.unknown,
      (): ElementType => {
        return UnknownCell;
      }
    );

    // 不支持的消息
    for (const unsupportMessageType of unsupportMessageTypes) {
      WKSDK.shared().register(
        unsupportMessageType,
        () => new UnsupportContent()
      );
      WKApp.messageManager.registerCell(
        unsupportMessageType,
        (): ElementType => {
          return UnsupportCell;
        }
      );
    }

    WKSDK.shared().chatManager.addCMDListener((message: Message) => {
      console.log("收到CMD->", message);
    });

    WKSDK.shared().channelManager.addListener((channelInfo: ChannelInfo) => {
      if (channelInfo.channel.channelType === ChannelTypePerson) {
        if (WKApp.loginInfo.uid === channelInfo.channel.channelID) {
          WKApp.loginInfo.name = channelInfo.title;
          WKApp.loginInfo.shortNo = channelInfo.orgData.short_no;
          WKApp.loginInfo.sex = channelInfo.orgData.sex;
          WKApp.loginInfo.save();
        }
      }
    });

    this.registerChatToolbars(); // 注册聊天工具栏
    this.registerMessageContextMenus(); // 注册消息上下文菜单
  }

  registerChatToolbars() {
    WKApp.endpoints.registerChatToolbar("chattoolbar.emoji", (ctx: any) => {
      return (
        <EmojiToolbar
          conversationContext={ctx}
          icon={require("../assets/toolbars/func_face_normal.png")}
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
          icon={require("../assets/toolbars/func_upload_image.png")}
          conversationContext={ctx}
        ></ImageToolbar>
      );
    });
  }

  registerMessageContextMenus() {
    WKApp.endpoints.registerMessageContextMenus(
      "contextmenus.copy",
      (message) => {
        if (message.contentType !== MessageContentType.text) {
          return null;
        }

        return {
          title: getI18nText('copy'),
          onClick: () => {
            (function (s) {
              document.oncopy = function (e) {
                e.clipboardData?.setData("text", s);
                e.preventDefault();
                document.oncopy = null;
              };
            })((message.content as MessageText).text || "");
            document.execCommand("Copy");
          },
        };
      },
      1000
    );

    // WKApp.endpoints.registerMessageContextMenus(
    //   "contextmenus.forward",
    //   (message, context) => {
    //     if (WKApp.shared.notSupportForward.includes(message.contentType)) {
    //       return null;
    //     }

    //     return {
    //       title: "转发",
    //       onClick: () => {
    //         context.fowardMessageUI(message);
    //       },
    //     };
    //   },
    //   2000
    // );
    WKApp.endpoints.registerMessageContextMenus(
      "contextmenus.reply",
      (message, context) => {
        return {
          title: getI18nText('reply'),
          onClick: () => {
            context.reply(message);
          },
        };
      }
    );
    // WKApp.endpoints.registerMessageContextMenus(
    //   "contextmenus.muli",
    //   (message, context) => {
    //     return {
    //       title: "多选",
    //       onClick: () => {
    //         context.setEditOn(true);
    //       },
    //     };
    //   },
    //   3000
    // );

    // WKApp.endpoints.registerMessageContextMenus(
    //   "contextmenus.revoke",
    //   (message, context) => {
    //     if (message.messageID === "") {
    //       return null;
    //     }

    //     let isManager = false;
    //     if (message.channel.channelType === ChannelTypeGroup) {
    //       const sub = WKSDK.shared().channelManager.getSubscribeOfMe(
    //         message.channel
    //       );
    //       if (sub?.role === GroupRole.manager || sub?.role === GroupRole.owner) {
    //         isManager = true;
    //       }
    //     }

    //     if (!isManager) {
    //       if (!message.send) {
    //         return null;
    //       }
    //       let revokeSecond = WKApp.remoteConfig.revokeSecond;
    //       if (revokeSecond > 0) {
    //         const messageTime = new Date().getTime() / 1000 - message.timestamp;
    //         if (messageTime > revokeSecond) {
    //           //  超过两分钟则不显示撤回
    //           return null;
    //         }
    //       }
    //     }
    //     return {
    //       title: "撤回",
    //       onClick: () => {
    //         context.revokeMessage(message).catch((err) => {
    //           Toast.error(err.msg);
    //         });
    //       },
    //     };
    //   },
    //   4000
    // );
  }
}
