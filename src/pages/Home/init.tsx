import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../App";
import WKApp from "../../Service/WkApp";
import BaseModule from "../../Module/BaseModule";
import DataSourceModule from "../../Module/DataSourceModule";

const RunApp = (props: any = {}) => {
  const { api, loginInfo, style = {}, onVisibleChange, buttonProps, channelInfo, jwtToken, rootId, onClose } = props;

  const apiURL = api;

  WKApp.config.userInfo = loginInfo;
  WKApp.config.channel = channelInfo;

  WKApp.apiClient.config.apiURL = apiURL;
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
    <React.StrictMode>
      <App onClose={onClose} style={style} onVisibleChange={onVisibleChange} buttonProps={buttonProps} />
    </React.StrictMode>
  );
};

export default RunApp;
