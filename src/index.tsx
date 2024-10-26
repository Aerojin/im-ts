// import React from "react";
// import ReactDOM from "react-dom/client";
import "./index.scss";
import RunApp from "./pages/Home";

const rootId: string = "__im_div__";
const windowAny = window as any;

const init = () => {
  const el = document.createElement("div");
  el.setAttribute("id", rootId);
  document.body.appendChild(el);
};

init();

windowAny.__RunApp__ = (props: any = {}) => {
  RunApp({ ...props, rootId });
};
