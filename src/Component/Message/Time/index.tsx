import { MessageContent } from "wukongimjssdk";
import moment from "moment";
import React from "react";
import { MessageContentTypeConst } from "../../../Utils/Constant";
import { MessageCell } from "../MessageCell";
import { getI18nText } from "../../../i18n";

import "./index.css";

export class TimeContent extends MessageContent {
  timestamp?: number;
  constructor(timestamp?: number) {
    super();
    this.timestamp = timestamp;
  }

  public get contentType() {
    return MessageContentTypeConst.time;
  }
}

export class TimeCell extends MessageCell {
  formatMessageTime(timestamp: number) {
    return moment(timestamp * 1000).format(
      `MM${getI18nText("month")}DD${getI18nText("day")}`
    );
  }

  render() {
    const { message } = this.props;
    const content = message.content as TimeContent;
    return (
      <div className="wk-message-time-box">
        <div className="wk-message-time-line1"></div>
        <div className="wk-message-time">
          {this.formatMessageTime(content.timestamp || 0)}
        </div>
        <div className="wk-message-time-line2"></div>
      </div>
    );
  }
}
