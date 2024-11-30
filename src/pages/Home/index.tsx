import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "../../App";
import WKApp from "../../Service/WkApp";
import BaseModule from "../../Module/BaseModule";
import DataSourceModule from "../../Module/DataSourceModule";
import customTheme from "./theme";

// let append = false;
const defaultApi = "http://106.15.250.63:443/v1/";

const CreateIm = (props: any = {}) => {
  const {
    api,
    username,
    style = {},
    onVisibleChange,
    jwtToken,
    rootId,
    onReady,
    unmounted,
    getQuestion,
    companyInfo = {},
  } = props;

  WKApp.config.userInfo = {
    username,
    password: "",
  };

  WKApp.config.channel = {
    channelID: "",
    channelType: 2,
  };

  WKApp.apiClient.config.apiURL = api || defaultApi;
  WKApp.apiClient.config.tokenCallback = () => {
    return WKApp.loginInfo.token;
  };

  WKApp.apiClient.config.jwtTokenCallback = () => {
    return jwtToken;
  };
  WKApp.loginInfo.load(); // 加载登录信息

  WKApp.shared.registerModule(new BaseModule());
  WKApp.shared.registerModule(new DataSourceModule());
  WKApp.shared.startup(); // app启动


  const root = ReactDOM.createRoot(
    document.getElementById(rootId) as HTMLElement
  );

  root.render(
    <ConfigProvider theme={customTheme}>
      <React.StrictMode>
        <App
          companyInfo={companyInfo}
          onReady={onReady}
          style={style}
          unmounted={unmounted}
          getQuestion={getQuestion}
          onVisibleChange={onVisibleChange}
        />
      </React.StrictMode>
    </ConfigProvider>
  );
};

export default CreateIm;
