import React, { useState, useEffect, useRef, useCallback } from "react";
import { MessageText } from "wukongimjssdk";
import { Flex } from "antd";
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

  console.log(888)
  const onContext = useCallback(
    (ctx: ConversationContext) => {
      context.current = ctx;
    },
    [context]
  );

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
    <Flex gap={0} className={styles.layout} vertical={false}>
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
  );
};

export default Chat;
