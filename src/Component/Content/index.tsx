import React, { Component } from "react";
// import { Row, Col, Image, Divider } from "antd";
// import ChatRecordList from "../ChatRecordList";
// import ScrollWrapper from "../ScrollWrapper";
import classNames from "classnames";
import MessageText from "../Message/Text";
import MessageImage from "../Message/Image";
// import { messageList, my } from "./data";
import { ConversationContext } from "../../Interface/Conversation";
import { MessageContentTypeConst } from "../../Utils/Constant";
import styles from "./index.module.scss";

const context: any = {};
const Content: React.FC<any> = (props = {}) => {
  const { message } = props;
  //   const p = {
  //     data: messageList,
  //     me: my,
  //     style: { height: 360, width: 500 },
  //   };

  console.log(222, message);

  return (
    <div className={styles.app}>
      <div className={styles.message}>
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
        {/* <MessageText /> */}
        {/* <ScrollWrapper {...p}>
        <ChatRecordList {...p} />
    </ScrollWrapper> */}
      </div>
    </div>
  );
};

export default Content;
