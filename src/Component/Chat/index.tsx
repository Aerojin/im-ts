import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import {
  WKSDK,
  Channel,
  MessageText,
  MessageContent,
  Setting,
  Mention,
} from "wukongimjssdk";
import WKApp from "../../Service/WkApp";
import Header from "../Header";
import Content from "../Content";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { Conversation } from '../Conversation';
import { MentionModel } from "../MessageInput1";
import styles from "./index.module.scss";

const Chat: React.FC<any> = (props: any) => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => { setLoading(false); }, 1500);
  }, []);
  const onSend = (text: string, mention?: MentionModel) => {
    const content = new MessageText(text);

    console.log(22, text, mention);

    if (mention) {
      const mn = new Mention();
      mn.all = mention.all;
      mn.uids = mention.uids;
      content.mention = mn;
    }

    const channel = new Channel("f83c9d5efde54b23955b0cb70c4d6d2a", 1);
    const channelInfo = WKSDK.shared().channelManager.getChannelInfo(channel);
    let setting = new Setting();
    if (channelInfo?.orgData.receipt === 1) {
      setting.receiptEnabled = true;
    }

    const message = WKSDK.shared().chatManager.send(content, channel, setting).then((res) => {
      console.log(777, res);
    });
    // const messageWrap = new MessageWrap(message);

    // this.addSendMessageToQueue(messageWrap);
    return message;
  };

  if(loading) {
    return null;
  }

  return (
    <Flex gap={0} className={styles.layout} vertical={false}>
      <Flex vertical className={styles.body}>
        <Header />
        <Conversation channel={new Channel('cd54cf2fa8274ade902f381d0800f3a6', 2)} chatBg=""  />
        {/* <Content {...props} channel={WKApp.shared.openChannel} /> */}
        {/* <Footer onSend={onSend} /> */}
      </Flex>
      <Flex vertical className={styles.sidebar}>
        <SideBar />
      </Flex>
    </Flex>
  );
};

export default Chat;
