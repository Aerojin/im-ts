import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import { Channel } from "wukongimjssdk";
import Header from "../Header";
import SideBar from "../SideBar";
import { Conversation } from '../Conversation';
import styles from "./index.module.scss";

const Chat: React.FC<any> = (props: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setLoading(false); }, 1500);
  }, []);

  if(loading) {
    return null;
  }

  return (
    <Flex gap={0} className={styles.layout} vertical={false}>
      <Flex vertical className={styles.body}>
        <Header />
        <Conversation channel={new Channel('cd54cf2fa8274ade902f381d0800f3a6', 2)} chatBg=""  />
      </Flex>
      <Flex vertical className={styles.sidebar}>
        <SideBar />
      </Flex>
    </Flex>
  );
};

export default Chat;
