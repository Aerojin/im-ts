import React, { Component, CSSProperties, HTMLProps } from "react";
// import WKSDK from "wukongimjssdk";
import classNames from "classnames";
import { Checkbox, Popconfirm } from "antd";
import { ConversationContext } from "../../../Interface/Conversation";
import { MessageWrap, BubblePosition } from "../../../Service/Model";

// import styles from "./index.module.scss";
import './index.css';

interface MessageBaseProps extends HTMLProps<any> {
  message: MessageWrap;
  context: ConversationContext;
  hiddenStatus?: boolean;
  bubbleStyle?: CSSProperties;
  hiddeBubble?: boolean;
  isChecked?: boolean;
  onBubble?: () => void;
}

export default class MessageBase extends Component<MessageBaseProps, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  getMessageStyle(message: MessageWrap) {
    const messageStyle: any = {};
    messageStyle.marginBottom = "15px";

    if (message.preMessage && message.preMessage.fromUID !== message.fromUID) {
      if (
        message.nextMessage &&
        message.nextMessage.fromUID === message.fromUID
      ) {
        messageStyle.marginBottom = "0px";
      }
    }
    if (
      message.nextMessage &&
      message.nextMessage.fromUID !== message.fromUID
    ) {
      messageStyle.marginBottom = "15px";
    }
    return messageStyle;
  }

  getBubbleBoxClassName() {
    const { message, hiddeBubble = false } = this.props;
    let messageBubble = "wk-message-base-bubble-box";

    if (hiddeBubble) {
      messageBubble += " hide";
    }

    if (message?.send) {
      messageBubble += " send";
    } else {
      messageBubble += " recv";
    }
    if (message?.bubblePosition === BubblePosition.first) {
      messageBubble += " first";
    } else if (message?.bubblePosition === BubblePosition.middle) {
      messageBubble += " middle";
    } else if (message?.bubblePosition === BubblePosition.last) {
      messageBubble += " last";
    } else if (message?.bubblePosition === BubblePosition.single) {
      messageBubble += " single";
    }
    return messageBubble;
  }

  onChecked(): any {}

  render() {
    const { context, message, hiddeBubble } = this.props;

    const messageStyle = this.getMessageStyle(message)

    return (
      <div
        className={classNames(
          "wk-message-base",
          context.editOn() ? "wk-message-base-check-open": undefined
        )}
        onClick={this.onChecked.bind(this)}
      >
        <div className="wk-message-base-checkBox" style={{ "marginBottom": messageStyle.marginBottom }}>
          <Checkbox />
        </div>
        <div
          className={message?.send ? "wk-message-base-send" : "wk-message-base-recv"}
          style={messageStyle}
        >
          <div className="wk-message-base-box">
            <Popconfirm
              title="是否重新发送"
              okText="是"
              cancelText="否"
              onConfirm={() => {}}
            >
              <div className="messageFail">
                <img src={require("./msg_status_fail.png")} alt=""></img>
              </div>
            </Popconfirm>
            <div className="senderAvatar" onClick={(el) => {}}>
              <img
                alt=""
                src="https://game.gtimg.cn/images/lol/act/a20201103lmpwjl/icon-ht.png"
              />
            </div>
            <div className={this.getBubbleBoxClassName()}>
              <div
                className="wk-message-base-bubble"
                // style={bubbleStyle}
                onContextMenu={(event) => {
                //   context.showContextMenus(message.message, event);
                }}
              >
                <div className="wk-message-base-content">
                  {this.props.children}
                </div>
              </div>
              {!hiddeBubble ? (
                <div className="svgAppendix">
                  {!message?.send ? (
                    <svg
                      width="9"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <filter
                          x="-50%"
                          y="-14.7%"
                          width="200%"
                          height="141.2%"
                          filterUnits="objectBoundingBox"
                          id="a"
                        >
                          <feOffset
                            dy="1"
                            in="SourceAlpha"
                            result="shadowOffsetOuter1"
                          ></feOffset>
                          <feGaussianBlur
                            stdDeviation="1"
                            in="shadowOffsetOuter1"
                            result="shadowBlurOuter1"
                          ></feGaussianBlur>
                          <feColorMatrix
                            values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
                            in="shadowBlurOuter1"
                          ></feColorMatrix>
                        </filter>
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
                          fill="#000"
                          filter="url(#a)"
                        ></path>
                        <path
                          d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
                          fill="#FFF"
                          className="corner"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      width="9"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <filter
                          x="-50%"
                          y="-14.7%"
                          width="200%"
                          height="141.2%"
                          filterUnits="objectBoundingBox"
                          id="a"
                        >
                          <feOffset
                            dy="1"
                            in="SourceAlpha"
                            result="shadowOffsetOuter1"
                          ></feOffset>
                          <feGaussianBlur
                            stdDeviation="1"
                            in="shadowOffsetOuter1"
                            result="shadowBlurOuter1"
                          ></feGaussianBlur>
                          <feColorMatrix
                            values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0"
                            in="shadowBlurOuter1"
                          ></feColorMatrix>
                        </filter>
                      </defs>
                      <g fill="none" fillRule="evenodd">
                        <path
                          d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
                          fill="#000"
                          filter="url(#a)"
                        ></path>
                        <path
                          d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
                          fill="FFF"
                          className="corner"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
