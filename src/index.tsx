// import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.scss";
import CreateIm from "./pages/Home";
import { setLocale } from "./i18n";

const rootId: string = "__im_div__";
const windowAny = window as any;

const init = () => {
  const el = document.createElement("div");
  el.setAttribute("id", rootId);
  document.body.appendChild(el);
};

init();

const render = (props: any) => {
  const { locale, ...restProps } = props;
  // 设置语言
  setLocale(locale);

  console.log('---------------runApp---------------', props);

  // 创建IM
  CreateIm({ ...restProps, rootId});
};

windowAny.__RunApp__ = render;
