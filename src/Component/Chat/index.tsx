import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageText } from "wukongimjssdk";
import { Flex } from "antd";
import Draggable from "react-draggable";
import WKApp from "../../Service/WkApp";
import Header from "../Header";
import SideBar from "../SideBar";
import { Conversation } from "../Conversation";
import ConversationContext from "../Conversation/context";
import styles from "./index.module.scss";

const Chat: React.FC<any> = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { onClose, companyInfo = {}, getQuestion } = props;
  const context = useRef<ConversationContext | undefined>(undefined);
  const draggleRef = useRef(null) as any;
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onContext = useCallback(
    (ctx: ConversationContext) => {
      context.current = ctx;
    },
    [context]
  );

  const onStart = (_event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const onSendMessage = useCallback(
    (msg: string) => {
      if (context.current) {
        context.current?.sendMessage(
          new MessageText(msg),
          WKApp.shared.getChannel()
        );
      }
    },
    [context]
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Draggable
      bounds={bounds}
      handle="#__chat_header__"
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <Flex gap={0} className={styles.layout} vertical={false} ref={draggleRef}>
        <Flex vertical className={styles.body}>
          <Header />
          <Conversation
            onContext={onContext}
            channel={WKApp.shared.getChannel()}
            chatBg=""
          />
        </Flex>
        <Flex vertical className={styles.sidebar}>
          <SideBar
            onClose={onClose}
            companyInfo={companyInfo}
            getQuestion={getQuestion}
            onSendMessage={onSendMessage}
          />
        </Flex>
      </Flex>
    </Draggable>
  );
};

export default Chat;
