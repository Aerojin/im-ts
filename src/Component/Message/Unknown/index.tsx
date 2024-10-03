import React from "react";
import { UnknownContent } from "wukongimjssdk";
import MessageBase from "../Base";
import { MessageCell } from "../MessageCell";
import { getI18nText } from '../../../i18n';

export class UnknownCell extends MessageCell {
  render() {
    const { message, context } = this.props;
    const content = message.content as UnknownContent;
    return (
      <MessageBase context={context} message={message}>
        [{getI18nText('message_does_not_support_viewing')}({content.realContentType})]
      </MessageBase>
    );
  }
}
