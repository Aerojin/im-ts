import React, { useRef } from "react";
import { Button } from "antd";
import MessageInput from "../MessageInput";
import ToolBar from "../ToolBar";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
  const messageContext = useRef();

  return (
    <div className={styles.app}>
      <ToolBar messageContext={messageContext} />
      <MessageInput
        onContext={(ctx: any) => {
          messageContext.current = ctx;
        }}
      />
      <div className={styles.button}>
        <Button type="primary">发送</Button>
      </div>
    </div>
  );
};

export default Footer;
