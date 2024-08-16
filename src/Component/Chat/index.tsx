import React from "react";
import { Flex } from "antd";
import Header from "../Header";
import Content from "../Content";
import Footer from "../Footer";
import SideBar from "../SideBar";
import styles from "./index.module.scss";

const Chat: React.FC = () => {
  return (
    <Flex gap={0} className={styles.layout} vertical={false} >
      <Flex vertical className={styles.body}>
        <Header />
        <Content />
        <Footer />
      </Flex>
      <Flex vertical className={styles.sidebar}>
        <SideBar />
      </Flex>
    </Flex>
  );
};

export default Chat;
