import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../App";
import WKApp from "../../Service/WkApp";
import BaseModule from "../../Module/BaseModule";
import DataSourceModule from "../../Module/DataSourceModule";

const RunApp = (props: any = {}) => {
  const { api, loginInfo, channelInfo } = props;
  //   const [loading, setLoading] = useState(true);

  const apiURL = api;
  // const apiURL = "http://106.15.250.63:8090/v1/";

  WKApp.config.userInfo = loginInfo;
  WKApp.config.channel = channelInfo;

  WKApp.apiClient.config.apiURL = apiURL;
  WKApp.apiClient.config.tokenCallback = () => {
    return WKApp.loginInfo.token;
  };
  WKApp.loginInfo.load(); // 加载登录信息

  WKApp.shared.registerModule(new BaseModule());
  WKApp.shared.registerModule(new DataSourceModule());
  WKApp.shared.startup(); // app启动

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

export default RunApp;
