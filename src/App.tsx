import React, { useEffect, useState, useRef } from "react";
import Chat from "./Component/Chat";
import styles from "./App.module.scss";
import APIClient from "./Service/APIClient";
import {
  WKSDK,
  ConnectStatus,
  Channel,
  SyncOptions,
  PullMode,
  Message,
  ConnectAddrCallback,
} from "wukongimjssdk";
// import { Convert } from "./Utils/convert";
import { MessageWrap } from "./Service/Model";
// import WKApp from "./Service/WkApp";

// const apiURL = "https://api.botgate.cn/v1/";
// // const apiURL = "http://106.15.250.63:8090/v1/";
// const apiClient = APIClient.shared;

// apiClient.config.apiURL = apiURL;

// apiClient.config.tokenCallback = () => {
//   return "6976e57768f94353a718c2a022984fbb";
// };

function App() {
  const [message, setMessage] = useState<MessageWrap[]>([]);

  const messageRef = useRef<any>([]);

  const loadData = (
    pullMode: PullMode,
    startMessageSeq: number
  ) => {
    const channel = new Channel("f83c9d5efde54b23955b0cb70c4d6d2a", 1);
    const opts = new SyncOptions();

    opts.startMessageSeq = startMessageSeq || 0;
    opts.endMessageSeq = 0;
    opts.limit = 30;
    opts.pullMode = pullMode;

    return Promise.resolve([]);

    // return apiClient
    //   .post(`message/channel/sync`, {
    //     limit: opts.limit,
    //     channel_id: channel.channelID,
    //     channel_type: channel.channelType,
    //     start_message_seq: opts.startMessageSeq || 0,
    //     end_message_seq: opts.endMessageSeq || 0,
    //     pull_mode: opts.pullMode,
    //   })
    //   .then((res) => {
    //     const { messages: messageList } = res || {};
    //     const messages = new Array<MessageWrap>();

    //     if (messageList) {
    //       messageList.forEach((msg: any) => {
    //         const message = Convert.toMessage(msg);
    //         const msg1 = new MessageWrap(message);
    //         messages.push(msg1);
    //       });
    //     }

    //     if (pullMode === PullMode.Up) {
    //       setMessage([...message, ...messages]);
    //       messageRef.current = [...message, ...messages];
    //     } else {
    //       setMessage([...messages, ...message]);
    //       messageRef.current = [...message, ...messages];
    //     }

    //     return res;
    //   });
  };


  useEffect(() => {
    // apiClient
    //   .post('http://106.15.250.63:8090/v1/awakenTheGroup', {
    //     username: "aero",
    //     email: "xx@163.com",
    //     phone: "13312345678"
    //   }).then((res) => {
    //     // aero_group
    //     console.log(333, res);
    //   });

    // apiClient.post(`http://106.15.250.63:8090/v1/user/login`, { 
    //   username: '008613312345678', 
    //   password: '12345678', 
    //   flag: 1 
    // }).then((result)=>{
    //     console.log(222, result);
    // });

    // WKSDK.shared().config.provider.connectAddrCallback = (
    //   callback: ConnectAddrCallback
    // ) => {
    //   callback('wss://wss.botgate.cn');
      
    // };

    // WKSDK.shared().config.uid = "5ffdd74b21774efeb79631e71919e46a";
    // WKSDK.shared().config.token = "6976e57768f94353a718c2a022984fbb";
    // WKSDK.shared().connect();



    // // 连接状态监听
    // WKSDK.shared().connectManager.addConnectStatusListener(
    //   (status, reasonCode) => {
    //     if (status === ConnectStatus.Connected) {
    //       console.log("连接成功");
    //     } else {
    //       console.log("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
    //     }
    //   }
    // );



    // WKSDK.shared().chatManager.addMessageListener((res) => {
    //   const msg1 = new MessageWrap(res);

    //   console.log(888, res);
    //   setMessage([...messageRef.current, msg1]);
    //   // console.log(111, message);
    // });

    // WKSDK.shared().config.provider.syncMessagesCallback = (
    //   channel: Channel,
    //   opts: SyncOptions
    // ): Promise<Message[]> => {
    //   return new Promise(() => {});
    // };

    // WKSDK.shared().connectManager.connect();
    // loadData(PullMode.Up, 0);
    // const channel = new Channel("f83c9d5efde54b23955b0cb70c4d6d2a", 1);
    // const opts = new SyncOptions();

    // opts.startMessageSeq = 0;
    // opts.endMessageSeq = 0;
    // opts.limit = 30;
    // opts.pullMode = PullMode.Up;

    // WKSDK.shared()
    //   .chatManager.syncMessages(channel, opts)
    //   .then((res) => {
    //     console.log(7778, res);
    //   });
  }, [messageRef]);

  return (
    <div className={styles.App}>
      <Chat message={message} loadData={loadData} />
    </div>
  );
}

export default App;
