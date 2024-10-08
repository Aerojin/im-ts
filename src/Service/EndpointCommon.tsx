import { Channel, WKSDK, Message } from "wukongimjssdk";
import WKApp from "./WkApp";
import React from "react";
import { EndpointCategory, EndpointID } from "../Utils/Constant";
import { EndpointManager } from "./Module";
import ConversationContext from "../Component/Conversation/context";

export class MessageContextMenus {
  title!: string;
  onClick?: () => void;
}

export class EndpointCommon {
  private _onLogins: VoidFunction[] = []; // 登录成功

  constructor() {
    
  }

  addOnLogin(v: VoidFunction) {
    this._onLogins?.push(v);
  }

  removeOnLogin(v: VoidFunction) {
    const len = this._onLogins.length;
    for (var i = 0; i < len; i++) {
      if (v === this._onLogins[i]) {
        this._onLogins.splice(i, 1);
        return;
      }
    }
  }

  showConversation(channel: Channel) {
    WKApp.shared.openChannel = channel;
    EndpointManager.shared.invoke(EndpointID.showConversation, {
      channel: channel,
    });
    WKApp.shared.notifyListener();
  }

  registerContactsHeader(
    id: string,
    callback: (param: any) => JSX.Element,
    sort?: number
  ) {
    EndpointManager.shared.setMethod(
      id,
      (param) => {
        return callback(param);
      },
      {
        sort: sort,
        category: EndpointCategory.contactsHeader,
      }
    );
  }
  contactsHeaders(): JSX.Element[] {
    return EndpointManager.shared.invokes(EndpointCategory.contactsHeader);
  }

  registerMessageContextMenus(
    sid: string,
    handle: (
      message: Message,
      context: ConversationContext
    ) => MessageContextMenus | null,
    sort?: number
  ) {
    EndpointManager.shared.setMethod(
      sid,
      (param: any) => {
        return handle(param.message, param.context);
      },
      {
        category: EndpointCategory.messageContextMenus,
        sort: sort,
      }
    );
  }

  messageContextMenus(
    message: Message,
    ctx: ConversationContext
  ): MessageContextMenus[] {
    return EndpointManager.shared.invokes(
      EndpointCategory.messageContextMenus,
      { message: message, context: ctx }
    );
  }

  registerChatToolbar(
    sid: string,
    handle: (ctx: ConversationContext) => React.ReactNode | undefined
  ) {
    EndpointManager.shared.setMethod(
      sid,
      (param) => {
        return handle(param);
      },
      {
        category: EndpointCategory.chatToolbars,
      }
    );
  }

  chatToolbars(ctx: ConversationContext): React.ReactNode[] {
    return EndpointManager.shared.invokes(EndpointCategory.chatToolbars, ctx);
  }

  registerChannelHeaderRightItem(
    id: string,
    callback: (param: any) => JSX.Element | undefined,
    sort?: number
  ) {
    EndpointManager.shared.setMethod(
      id,
      (param) => {
        return callback(param);
      },
      {
        category: EndpointCategory.channelHeaderRightItems,
        sort: sort,
      }
    );
  }

  channelHeaderRightItems(channel: Channel): JSX.Element[] {
    return EndpointManager.shared.invokes(
      EndpointCategory.channelHeaderRightItems,
      { channel: channel }
    );
  }

  organizationalTool(
    channel: Channel,
    disableSelectList?: string[],
    render?: JSX.Element
  ): JSX.Element {
    return EndpointManager.shared.invoke(EndpointCategory.organizational, {
      channel,
      disableSelectList,
      render,
    });
  }

  registerOrganizationalTool(
    sid: string,
    callback: (param: any) => JSX.Element | undefined
  ) {
    EndpointManager.shared.setMethod(
      EndpointCategory.organizational,
      (param) => {
        return callback(param);
      },
      {
        category: EndpointCategory.organizational,
      }
    );
  }

  organizationalLayer(channel: Channel, disableSelectList?: string[]): void {
    return EndpointManager.shared.invoke(EndpointCategory.organizationalLayer, {
      channel,
      disableSelectList,
    });
  }

  registerOrganizationalLayer(sid: string, callback: (param: any) => void) {
    EndpointManager.shared.setMethod(
      EndpointCategory.organizationalLayer,
      (param) => {
        return callback(param);
      },
      {
        category: EndpointCategory.organizational,
      }
    );
  }

  callOnLogin() {
    const len = this._onLogins.length;
    for (var i = 0; i < len; i++) {
      this._onLogins[i]();
    }
  }
}

export class ChatToolbar {
  icon!: string;
  onClick?: () => void;
}
