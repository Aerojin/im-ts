import React, { Component, ElementType, HTMLProps } from "react";
import { notification } from "antd";
import clazz from "classnames";
import hotkeys from "hotkeys-js";
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
import { Subscriber, MessageText } from "wukongimjssdk";
import { ConversationContext } from "../../Interface/Conversation";
import {
  MessageInputContext,
  OnAddMentionFnc,
  OnInsertFnc,
} from "../../Interface/MessageInput";
import InputStyle from "./defaultStyle";
import styles from  "./index.module.scss";

interface MessageInputProps extends HTMLProps<any> {
  context?: ConversationContext;
  onSend?: (text: string, mention?: MentionModel) => void;
  members?: Array<Subscriber>;
  onInputRef?: any;
  onInsertText?: (fnc: OnInsertFnc) => void;
  onAddMention?: (fnc: OnAddMentionFnc) => void;
  hideMention?: boolean;
  toolbar?: JSX.Element;
  onContext?: (ctx: MessageInputContext) => void;
  topView?: JSX.Element;
}

interface MessageInputState {
  value: string | undefined;
  mentionCache: any;
  quickReplySelectIndex: number;
}

export class MentionModel {
  all: boolean = false;
  uids?: Array<string>;
}

class MemberSuggestionDataItem implements SuggestionDataItem {
  id!: string | number;
  display!: string;
  icon!: string;
}

class MessageInput
  extends Component<MessageInputProps, MessageInputState>
  implements MessageInputContext
{
  toolbars?: Array<ElementType>;
  inputRef: any;
  eventListener: any;
  constructor(props: MessageInputProps) {
    super(props);
    this.toolbars = [];
    this.state = {
      value: "",
      mentionCache: {},
      quickReplySelectIndex: 0,
    };
    if (props.onAddMention) {
      props.onAddMention(this.addMention.bind(this));
    }
  }
  text(): string | undefined {
    const { value } = this.state;
    return value;
  }
  componentDidMount() {
    const self = this;
    const scope = "messageInput";
    hotkeys.filter = function (event) {
      return true;
    };
    hotkeys("ctrl+enter", scope, function (event, handler) {
      const { value } = self.state;
      self.setState({
        value: value + "\n",
        mentionCache: {},
      });
    });
    hotkeys.setScope(scope);

    const { onInsertText, onContext } = this.props;
    if (onInsertText) {
      onInsertText(this.insertText.bind(this));
    }

    if (onContext) {
      onContext(this);
    }
  }

  componentWillUnmount() {
    const scope = "messageInput";
    hotkeys.unbind("ctrl+enter", scope);

    if (this.eventListener) {
      document.removeEventListener("keydown", this.eventListener);
    }
  }

  handleKeyPressed(e: any) {
    if (e.charCode !== 13) {
      //非回车
      return;
    }
    if (e.charCode === 13 && e.ctrlKey) {
      // ctrl+Enter不处理
      return;
    }
    e.preventDefault();

    this.send();
  }

  send() {
    console.log("--send--", this.state.value);

    const { value } = this.state;
    if (value && value.length > 1000) {
      notification.error({
        message: "输入内容长度不能大于1000字符！",
      });
      return;
    }
    if (this.props.onSend && value && value.trim() !== "") {
      let formatValue = this.formatMentionText(value);
      let mention = this.parseMention(formatValue);
      this.props.onSend(formatValue, mention);
    }
    this.setState({
      value: "",
      quickReplySelectIndex: 0,
      mentionCache: {},
    });
  }

  formatMentionText(text: string) {
    let newText = text;
    let mentionMatchResult = newText.match(/@([^ ]+) /g);
    if (mentionMatchResult && mentionMatchResult.length > 0) {
      for (let i = 0; i < mentionMatchResult.length; i++) {
        let mentionStr = mentionMatchResult[i];
        let name = mentionStr.replace("@[", "@").replace("]", "");
        newText = newText.replace(mentionStr, name);
      }
    }
    return newText;
  }

  parseMention(text: string) {
    const { mentionCache } = this.state;
    let mention = new MentionModel();
    if (mentionCache) {
      let mentions = Object.values(mentionCache);
      let all = false;
      if (mentions.length > 0) {
        let mentionUIDS = [];
        let mentionMatchResult = text.match(/@([^ ]+) /g);
        if (mentionMatchResult && mentionMatchResult.length > 0) {
          for (let i = 0; i < mentionMatchResult.length; i++) {
            let mentionStr = mentionMatchResult[i];
            let name = mentionStr.trim().replace("@", "");
            let member = mentionCache[name];
            if (member) {
              if (member.uid === -1) {
                // -1表示@所有人
                all = true;
              } else {
                mentionUIDS.push(member.uid);
              }
            }
          }
        }
        if (all) {
          mention.all = true;
        } else {
          mention.uids = mentionUIDS;
        }
      }
      return mention;
    }
    return undefined;
  }

  handleChange(event: { target: { value: string } }) {
    const value = event.target.value;
    this.setState({
      value: value,
    });
  }

  insertText(text: string): void {
    let newText = this.state.value + text;
    this.setState({
      value: newText,
    });
    this.inputRef.focus();
  }

  addMention(uid: string, name: string): void {
    const { mentionCache } = this.state;
    if (name) {
      mentionCache[`${name}`] = { uid: uid, name: name };
      this.insertText(`@[${name}] `);
      this.setState({
        mentionCache: mentionCache,
      });
    }
  }

  render() {
    const { members = [{ uid: 1, name: "aerojin" }], onInputRef } = this.props;
    const { value, mentionCache } = this.state;
    let selectedItems = new Array<MemberSuggestionDataItem>();

    if (members && members.length > 0) {
      selectedItems = members.map((member) => {
        const item = new MemberSuggestionDataItem();
        item.id = member.uid;
        item.icon = "";
        item.display = member.name;
        return item;
      });
      selectedItems.splice(0, 0, {
        icon: "https://i.ibb.co/rHNw9Xf/mention.png",
        id: -1,
        display: "所有人",
      });
    }

    return (
      <div className={styles.inputbox}>
        <MentionsInput
          style={InputStyle.getStyle()}
          value={value}
          onKeyPress={(e: any) => this.handleKeyPressed.bind(this)(e)}
          onChange={this.handleChange.bind(this)}
          className={styles.input}
          placeholder={`按 Ctrl + Enter 换行，按 Enter 发送`}
          allowSuggestionsAboveCursor={true}
          inputRef={(ref: any) => {
            this.inputRef = ref;
            if (onInputRef) {
              onInputRef(ref);
            }
          }}
        >
          <Mention
            className="mentions__mention"
            trigger={new RegExp(`(@([^'\\s'@]*))$`)}
            data={selectedItems}
            markup="@[__display__]"
            displayTransform={(id:any, display: any) => `@${display}`}
            appendSpaceOnAdd={true}
            onAdd={(id:any, display: any) => {
              mentionCache[display] = { uid: id, name: display };
            }}
            renderSuggestion={(
              suggestion: any,
              search: any,
              highlightedDisplay: any,
              index: any,
              focused: any
            ) => {
              return (
                <div
                  className={clazz(
                    styles.member,
                    focused ? styles.selected: null
                  )}
                >
                  <div className={styles.iconbox}>
                    <img
                      alt=""
                      className={styles.icon}
                      style={{
                        width: `24px`,
                        height: `24px`,
                        borderRadius: `24px`,
                      }}
                      src={suggestion.icon}
                    />
                  </div>
                  <div>
                    <strong>{highlightedDisplay}</strong>
                  </div>
                </div>
              );
            }}
          />
        </MentionsInput>
      </div>
    );
  }
}

export default MessageInput;
