import React from "react";
// import { Row, Col, Image, Divider } from "antd";
import ChatRecordList from "../ChatRecordList";
import ScrollWrapper from "../ScrollWrapper";
import { messageList, my } from "./data";
import styles from "./index.module.scss";

const Content: React.FC = () => {
  const p = {
    data: messageList,
    me: my,
    style: { height: 360, width: 500 },
  };

  return <div className={styles.app}>
    <ScrollWrapper {...p}>
        <ChatRecordList {...p} />
    </ScrollWrapper>
  </div>;
};

export default Content;
