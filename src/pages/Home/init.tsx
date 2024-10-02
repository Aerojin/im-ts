import React from "react";
import ReactDOM from "react-dom/client";
import App from "../../App";
import WKApp from "../../Service/WkApp";
import BaseModule from "../../Module/BaseModule";
import DataSourceModule from "../../Module/DataSourceModule";
// import { generateToken } from "../../Utils/jwt";

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

  WKApp.apiClient.config.jwtTokenCallback = () => {
    return 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvand0NEAxNjMuY29tIiwidXNlcm5hbWUiOiJoZWxsb2p3dDQiLCJleHAiOjE3Mjc5Mjk3ODksImlhdCI6MTcyNzg0MzM4OX0.rVL_qDDIUmJ8tVo-qq7Zv0Ien6iW0qT_BjL5nIBqfb7vTqCk4MR4BvcI7dEEVfGzBKZr0duCNuy6Q-7RSeTL1sfUGNwZzC0vXgzKNe--Sy6NlUJdYOLEVWEWynZGboAKSFUw08WB0-Er8Exu_HwcXJYR5a0mglJgPJ2mr5sMnK14cGx2SEAYwxQKcEZ3qnVT4ci6IxrPEz8M8wNUJr-0n6rFrgBJ374jZtXvsp9_j5-lrGjS3sCYOuQhfHcEo9rLoIgnsVBitP6Rf2aFglGBWpbijvv1yysZN5neQtBv6MmF30yo40ns3AgaAk14h4mhHOAHwjLItgXUII17nwFEIQ';
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
