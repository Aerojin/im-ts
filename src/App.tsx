import React from "react";
import WKApp from "./Service/WkApp";
import Chat from "./Component/Chat";
import WKBase from "./Component/WKBase";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <WKBase
        onContext={(ctx) => {
          console.log("goto main----111>", ctx);
          WKApp.shared.baseContext = ctx;
        }}
      >
        <Chat />
      </WKBase>
    </div>
  );
}

export default App;
