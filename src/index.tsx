import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
// import App from "./App";
// import WKApp from "./Service/WkApp";
// import BaseModule from "./Module/BaseModule";
// import DataSourceModule from "./Module/DataSourceModule";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";

// const apiURL = "https://api.botgate.cn/v1/";
// const apiURL = "http://106.15.250.63:8090/v1/";

// WKApp.apiClient.config.apiURL = apiURL;
// WKApp.apiClient.config.tokenCallback = () => {
//   return WKApp.loginInfo.token;
// };
// WKApp.loginInfo.load(); // 加载登录信息

// WKApp.shared.registerModule(new BaseModule());
// WKApp.shared.registerModule(new DataSourceModule());
// WKApp.shared.startup(); // app启动

// // const windowAny = window as any;
// // windowAny.WkApp = WKApp;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

// RunApp({
//   api: 'https://api.botgate.cn/v1/',
//   loginInfo: { username: "15900000002", password: "a1234567" },
//   channelInfo: {
//     channelID: "41fd143a21b94500a66e4e327fb92d7b",
//     channelType: 2,
//   },
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
