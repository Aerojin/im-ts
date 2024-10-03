import { MessageSignalContent } from "wukongimjssdk";
import React from "react";
import MessageBase from "../Base";
import { MessageCell } from "../MessageCell";
import { getI18nText } from '../../../i18n';

export class SignalMessageContent extends MessageSignalContent {
  public get conversationDigest(): string {
    return getI18nText('message_is_encrypted');
  }
}

export class SignalMessageCell extends MessageCell {
  render() {
    const { message, context } = this.props;
    return (
      <MessageBase context={context} message={message} onBubble={() => {}}>
        <div className="wk-message-text">
          <pre>{getI18nText('message_is_encrypted')}</pre>
        </div>
      </MessageBase>
    );
  }
}
