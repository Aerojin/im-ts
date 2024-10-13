import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import WKApp from "../../Service/WkApp";
import Header from "../Header";
import SideBar from "../SideBar";
import { Conversation } from "../Conversation";
import styles from "./index.module.scss";

const Chat: React.FC<any> = (props: any) => {
  const [loading, setLoading] = useState(true);
  const { onClose, companyInfo = {} } = props;

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
        <Conversation channel={WKApp.shared.getChannel()} chatBg="" />
      </Flex>
      <Flex vertical className={styles.sidebar}>
        <SideBar onClose={onClose} companyInfo={companyInfo} />
      </Flex>
    </Flex>
  );
};

export default Chat;
