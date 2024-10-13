// import ReactDOM from "react-dom/client";
// import { Affix } from "antd";
import RunApp from "./init";
import { setLocale } from '../../i18n';
// import styles from "./index.module.scss";

class Dialog {
  container: any;
  append: boolean = false;
  rootId: string = "__im_div__";
  constructor() {
    this.init();
  }

  init() {
    const el = document.createElement("div");
    el.setAttribute("id", this.rootId);
    // el.setAttribute("class", styles.container);
    this.container = el;
    document.body.appendChild(el);
  }

  render(props: any) {
    const _this = this;
    const {
      jwtToken,
      username,
      style = {},
      onVisibleChange,
      companyInfo = {},
      onReady = () => {},
      api = "http://106.15.250.63:8090/v1/",
    } = props;

    _this.appendIm({
      api: api,
      jwtToken,
      style,
      onReady,
      companyInfo,
      onVisibleChange,
      rootId: _this.rootId,
      loginInfo: {
        username,
        password: "",
      },
      channelInfo: {
        channelID: "",
        channelType: 2,
      },
    });
  }

  appendIm(payload: any) {
    if (this.append) {
      return;
    }

    RunApp(payload);
    this.append = true;
  }
}

const dialog = new Dialog();

const runApp = (props: any) => {
  const {locale } = props;

  // 设置语言
  setLocale(locale);
  dialog.render(props);

  return dialog;
};

export default runApp;
