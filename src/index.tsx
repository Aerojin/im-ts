import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import WKApp from './Service/WkApp';
import reportWebVitals from './reportWebVitals';

const apiURL = "https://api.botgate.cn/v1/";

WKApp.apiClient.config.apiURL = apiURL;
WKApp.apiClient.config.tokenCallback = () => {
  return WKApp.loginInfo.token;
};
WKApp.loginInfo.load(); // 加载登录信息
WKApp.shared.startup(); // app启动

const windowAny = window as any;
windowAny.WkApp = WKApp;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
