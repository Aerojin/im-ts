import React, { useState, useEffect } from "react";
// import { Affix } from "antd";
import WKApp from "./Service/WkApp";
import Chat from "./Component/Chat";
import WKBase from "./Component/WKBase";
import { setLocale } from "./i18n";
import styles from "./App.module.scss";

const DEFAULT_STYLE = { bottom: 150, right: 100 };

function App(props: any = {}) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(Date.now());
  const {
    style = DEFAULT_STYLE,
    onVisibleChange,
    onReady,
    companyInfo = {},
    unmounted = () => {},
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
        onChangeLanguage: (locale: string) => {
          setLocale(locale || "cn");
          setTimeout(() => {
            setKey(Date.now());
          }, 0);
        },
      });
    }

    return () => {
      unmounted && unmounted();
    };
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
          <Chat key={key} onClose={onClose} companyInfo={companyInfo} />
        </WKBase>
      </div>
    </React.Fragment>
  );
}

export default App;
