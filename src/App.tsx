import React, { useState } from "react";
import { Affix } from "antd";
import WKApp from "./Service/WkApp";
import Chat from "./Component/Chat";
import WKBase from "./Component/WKBase";
import styles from "./App.module.scss";

function App(props: any = {}) {
  const [visible, setVisible] = useState(false);
  const { onClose, style = {}, buttonProps = {}, onVisibleChange } = props || {};
  const { bottom = 150, right = 100 } = style || {};
  const {
    bottom: iconBottom = 50,
    right: iconRight = 50,
    offsetBottom = 100,
    icon = "https://cdn.wuhuxianmai.cn/deltrix/im_kefu.jpeg",
  } = buttonProps || {};

  const onClick = () => {
    const val = !visible;

    setVisible(val);
    onVisibleChange && onVisibleChange(val);
  };

  return (
    <React.Fragment>
      <div
        className={styles.App}
        style={{ bottom, right, display: visible ? "block" : "none" }}
      >
        <WKBase
          onContext={(ctx) => {
            console.log("goto main----111>", ctx);
            WKApp.shared.baseContext = ctx;
          }}
        >
          <Chat onClose={onClose} />
        </WKBase>
      </div>
      <Affix
        offsetBottom={offsetBottom}
        style={{ position: "absolute", bottom: iconBottom, right: iconRight }}
      >
        <img className={styles.service} src={icon} onClick={onClick} alt="" />
      </Affix>
    </React.Fragment>
  );
}

export default App;
