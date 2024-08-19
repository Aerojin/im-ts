// import { Modal } from "@douyinfe/semi-ui";
import { Channel } from "wukongimjssdk";
import React, { Component, HTMLProps, ReactNode } from "react";
// import ConversationSelect from "../ConversationSelect";
// import UserInfo from "../UserInfo";
import "./index.css";

export interface WKBaseState {
  showUserInfo?: boolean;
  userUID?: string;
  vercode?: string; // 加好友的验证码
  fromChannel?: Channel;
  showConversationSelect?: boolean;
  conversationSelectTitle?: string;
  showAlert?: boolean;
  alertContent?: string;
  alertTitle?: string;
  onAlertOk?: () => void;
  conversationSelectFinished?: (channel: Channel[]) => void;

  showGlobalModal?: boolean; // 显示全局弹窗
  globalModalOptions?: GlobalModalOptions;
}

export class GlobalModalOptions {
  width?: string;
  height?: string;
  body?: ReactNode;
  footer?: ReactNode;
  className?: string;
  closable?: boolean;
}

export interface WKBaseProps {
  children: React.ReactNode;
  onContext?: (context: WKBaseContext) => void;
}

export interface WKBaseContext {}

export default class WKBase
  extends Component<WKBaseProps, WKBaseState>
  implements WKBaseContext
{
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onContext } = this.props;
    if (onContext) {
      onContext(this);
    }
  }

  render() {
    return <div className="wk-base">{this.props.children}</div>;
  }
}
