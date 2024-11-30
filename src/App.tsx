import React, { useState, useEffect } from "react";
// import { Affix } from "antd";
import WKApp from "./Service/WkApp";
import Chat from "./Component/Chat";
import WKBase from "./Component/WKBase";
import { setLocale } from "./i18n";
import styles from "./App.module.scss";

const DEFAULT_STYLE = { bottom: 150, right: 100 };
const getUnread = () => {
  const model = WKApp.shared.getModule("DataSource") as any;
  const { conversations } = model || {};
  const { unread = 0 } = conversations[0] || {};

  if (!conversations || (conversations && conversations.length === 0)) {
    return { success: false, msg: "还未初始化，请稍后重试", count: null };
  }

  return { success: true, msg: "还未初始化，请稍后重试", count: unread };
};

const callApiWithRetry = (retryLimit = 5, delayMs = 1000) => {
  let attempts = 0;
  const retry = () => {
    return new Promise((resolve, reject) => {
      const res = getUnread();
      attempts += 1;

      if (attempts > retryLimit) {
        resolve(res);
      }

      if (!res.success) {
        setTimeout(() => {
          retry().then(resolve, reject);
        }, delayMs);
        return;
      }

      resolve(res);
    });
  };

  return retry();
};

function App(props: any = {}) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(Date.now());
  const {
    getQuestion = () => {},
    style = DEFAULT_STYLE,
    onVisibleChange,
    onReady,
    companyInfo = {},
    unmounted = () => {},
  } = props || {};

  // const newStyle = ({ bottom = 150, right = 100 } = style || {});

  useEffect(() => {
    if (onReady && typeof onReady === "function") {
      setTimeout(() => {
        onReady({
          getUnread: () => {
            return callApiWithRetry(5, 1000);
          },
          onOpenIm: () => {
            setVisible(true);
            onVisibleChange && onVisibleChange(true);
            return WKApp.shared.setUnRead();
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
      }, 0);
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
            WKApp.shared.baseContext = ctx;
          }}
        >
          <Chat
            key={key}
            onClose={onClose}
            getQuestion={getQuestion}
            companyInfo={companyInfo}
          />
        </WKBase>
      </div>
    </React.Fragment>
  );
}

export default App;
