import React from "react";
import Chat from "./Component/Chat";
import styles from "./App.module.scss";
// import { Convert } from "./Utils/convert";
import { MessageWrap } from "./Service/Model";
// import WKApp from "./Service/WkApp";

// const apiURL = "https://api.botgate.cn/v1/";
// // const apiURL = "http://106.15.250.63:8090/v1/";
// const apiClient = APIClient.shared;

// apiClient.config.apiURL = apiURL;


function App() {

  return (
    <div className={styles.App}>
      <Chat />
    </div>
  );
}

export default App;
