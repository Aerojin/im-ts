import React from "react";
// import { Image } from "antd";
import EmojiToolbar from "../EmojiToolbar";
import ImageToolbar from "../ImageToolbar";
import styles from "./index.module.scss";

const ToolBar = (props: any = {}) => {
  const { messageContext } = props;

  const insertText = (val: any) => {
    messageContext.current.insertText(val);
  };

  return (
    <ul className={styles.chattoolbars}>
      <li className={styles.item}>
        <EmojiToolbar insertText={insertText} />
      </li>
      {/* <li className={styles.item}>
        <img
          src="./assets/toolbars/func_screenshot.svg"
          width={20}
          height={20}
        />
      </li> */}
      <li className={styles.item}>
        <ImageToolbar icon="./assets/toolbars/func_upload_image.svg" />
      </li>

      {/* <SmileOutlined style={{ fontSize: 23, marginRight:15, cursor: 'pointer' }} /> */}
    </ul>
  );
};

export default ToolBar;
