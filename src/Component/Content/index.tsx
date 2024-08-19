import React, { Component, useState } from "react";
// import { Row, Col, Image, Divider } from "antd";
import classNames from "classnames";
import {
  PullMode,
  WKSDK,
  Channel,
  MessageContent,
  Setting,
} from "wukongimjssdk";
import MessageText from "../Message/Text";
import MessageImage from "../Message/Image";
// import { messageList, my } from "./data";
import { ConversationContext } from "../../Interface/Conversation";
import { MessageContentTypeConst } from "../../Utils/Constant";
import styles from "./index.module.scss";
import message from "./mock";

let scrollTimer: any = 0;
const context: any = {};
const Content: React.FC<any> = (props = {}) => {
  const { message, loadData } = props;
  const [loading, setLoading] = useState(false);

  // https://api.botgate.cn/v1/message/channel/sync
  // https://api.botgate.cn/v1/message/channel/sync

 

  const handleScrollEnd = (e: any) => {
    console.log("---handleScrollEnd---");
    const msg = message[0];
    const current = msg?.message;
    const targetScrollTop = e.target.scrollTop;
    const scrollOffsetTop =
      e.target.scrollHeight - (targetScrollTop + e.target.clientHeight);
    if (targetScrollTop <= 100 && !loading && current.messageSeq) {
      // 下拉

      console.log(1111, msg, current.messageSeq);

      setLoading(true);
      loadData(PullMode.Down, current.messageSeq - 1).then((res: any) => {
        console.log(888, res);
        setLoading(false);
      });
      console.log("下拉加载....");
    } else if (scrollOffsetTop <= 500 && !loading) {
      // 上拉
      console.log("上拉加载....");
    }
  };

  const handleScroll = (e: any) => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      handleScrollEnd(e);
    }, 500);
  };

  return (
    <div className={styles.app}>
      <div className={styles.message} onScroll={handleScroll}>
        {message.map((msg: any, i: any) => {
          let last = false;

          if (i === message.length - 1) {
            last = true;
          }

          return (
            <div
              onAnimationEnd={() => {
                msg.locateRemind = false;
                // this.setState({});
              }}
              key={msg.clientMsgNo}
              id={`${
                msg.contentType === MessageContentTypeConst.time ? "time-" : ""
              }${msg.clientMsgNo}`}
              className={classNames(
                "wk-message-item",
                last ? "wk-message-item-last" : undefined,
                msg.locateRemind ? "wk-message-item-reminder" : undefined
              )}
            >
              {MessageContentTypeConst.image === msg.contentType ? (
                <MessageImage message={msg} context={context} />
              ) : (
                <MessageText message={msg} context={context} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
