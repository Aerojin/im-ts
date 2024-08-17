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
} from "wukongimjssdk";
import { Convert } from "./Utils/convert";
import { MessageWrap } from "./Service/Model";


const apiURL = "https://api.botgate.cn/v1/";
const apiClient = APIClient.shared;

apiClient.config.apiURL = apiURL;

apiClient.config.tokenCallback = () => {
  return "6976e57768f94353a718c2a022984fbb";
};

function App() {
  const [message, setMessage] = useState<MessageWrap[]>([]);
  useEffect(() => {
    WKSDK.shared().config.uid = "5ffdd74b21774efeb79631e71919e46a";
    WKSDK.shared().config.token = "6976e57768f94353a718c2a022984fbb";
    WKSDK.shared().connect();

    // 连接状态监听
    WKSDK.shared().connectManager.addConnectStatusListener(
      (status, reasonCode) => {
        if (status === ConnectStatus.Connected) {
          console.log("连接成功");
        } else {
          console.log("连接失败", reasonCode); //  reasonCode: 2表示认证失败（uid或token错误）
        }
      }
    );

    WKSDK.shared().chatManager.addMessageListener((message) => {
      console.log(111, message);
    });

    WKSDK.shared().config.provider.syncMessagesCallback = (
      channel: Channel,
      opts: SyncOptions
    ): Promise<Message[]> => {
      return new Promise(() => {});
    };

    const channel = new Channel("f83c9d5efde54b23955b0cb70c4d6d2a", 1);
    const opts = new SyncOptions();

    opts.startMessageSeq = 0;
    opts.endMessageSeq = 0;
    opts.limit = 30;
    opts.pullMode = PullMode.Down;

    apiClient
      .post(`message/channel/sync`, {
        limit: opts.limit,
        channel_id: channel.channelID,
        channel_type: channel.channelType,
        start_message_seq: opts.startMessageSeq || 0,
        end_message_seq: opts.endMessageSeq || 0,
        pull_mode: opts.pullMode,
      })
      .then((res) => {
        const { messages: messageList } = res || {};
        const messages = new Array<MessageWrap>();

        if (messageList) {
          messageList.forEach((msg: any) => {
            const message = Convert.toMessage(msg);
            const  msg1 = new MessageWrap(message);
            console.log(333, message.send, msg1.send);
            messages.push(msg1);
          });
        }

        setMessage(messages);
      });
    WKSDK.shared()
      .chatManager.syncMessages(channel, opts)
      .then((res) => {
        console.log(7778, res);
      });
  }, []);

  return (
    <div className={styles.App}>
      <Chat message={message} />
    </div>
  );
}

export default App;
