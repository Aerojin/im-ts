import React, { useState, useEffect } from "react";
// import { Affix } from "antd";
import WKApp from "./Service/WkApp";
import Chat from "./Component/Chat";
import WKBase from "./Component/WKBase";
import styles from "./App.module.scss";

const DEFAULT_STYLE = { bottom: 150, right: 100 };

function App(props: any = {}) {
  const [visible, setVisible] = useState(false);
  const {
    style = DEFAULT_STYLE,
    onVisibleChange,
    onReady,
    companyInfo = {},
  } = props || {};
  // const newStyle = ({ bottom = 150, right = 100 } = style || {});

  useEffect(() => {
    if (onReady && typeof onReady === "function") {
      onReady({
        onOpenIm: () => {
          setVisible(true);
          onVisibleChange && onVisibleChange(true);
        },
        onCloseIm: () => {
          setVisible(false);
          onVisibleChange && onVisibleChange(false);
        },
      });
    }
  }, []);

  const onClose = () => {
    setVisible(false);
    onVisibleChange && onVisibleChange(false);
  };

  return (
    <React.Fragment>
      <div
        className={styles.App}
        style={{ ...style, display: visible ? "block" : "none" }}
      >
        <WKBase
          onContext={(ctx) => {
            console.log("goto main----111>", ctx);
            WKApp.shared.baseContext = ctx;
          }}
        >
          <Chat onClose={onClose} companyInfo={companyInfo} />
        </WKBase>
      </div>
    </React.Fragment>
  );
}

export default App;
