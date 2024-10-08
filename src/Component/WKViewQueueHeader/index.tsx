import React from "react";
import { Button } from "antd";
import { Component, ReactNode } from "react";
import { FinishButtonContext } from "../../Service/Context";
import { getI18nText } from "../../i18n";

import "./index.css";

export interface WKViewQueueHeaderProps {
  title: string;
  onBack?: () => void;
  hideBack?: boolean; // 是否隐藏返回按钮
  showFinishButton?: boolean; // 是否显示完成按钮
  onFinished?: () => void;
  onFinishButtonContext?: (context: FinishButtonContext) => void;
  action?: JSX.Element;
}

export interface WKViewQueueHeaderState {
  loading?: boolean;
  disable?: boolean;
}

export default class WKViewQueueHeader
  extends Component<WKViewQueueHeaderProps, WKViewQueueHeaderState>
  implements FinishButtonContext
{
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      disable: false,
    };
  }
  loading(loading: boolean): void {
    this.setState({
      loading: loading,
    });
  }
  disable(disable: boolean): void {
    this.setState({
      disable: disable,
    });
  }

  componentDidMount() {
    const { onFinishButtonContext } = this.props;
    if (onFinishButtonContext) {
      onFinishButtonContext(this);
    }
  }

  render(): ReactNode {
    const isDark = false;
    const { title, onBack, hideBack, showFinishButton, onFinished, action } =
      this.props;
    const { loading, disable } = this.state;
    return (
      <div className="wk-viewqueueheader">
        {hideBack ? undefined : (
          <div
            className="wk-viewqueueheader-back"
            onClick={() => {
              if (onBack) {
                onBack();
              }
            }}
          >
            <img
              src={require(`${
                isDark ? "./assets/nav_back_dark.png" : "./assets/nav_back.png"
              }`)}
            ></img>
          </div>
        )}
        <div className="wk-viewqueueheader-content">
          <div className="wk-viewqueueheader-content-title">{title}</div>
          {showFinishButton ? (
            <div className="wk-viewqueueheader-content-action">
              <Button
                type="primary"
                loading={loading}
                disabled={disable}
                onClick={() => {
                  if (onFinished) {
                    onFinished();
                  }
                }}
              >
                {getI18nText("complete")}
              </Button>
            </div>
          ) : undefined}
          {action}
        </div>
      </div>
    );
  }
}
