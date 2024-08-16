import { CSSProperties, ReactNode, MouseEventHandler } from "react";

export interface IContact {
  id?: number | string
  avatar?: string
  nickname?: string
  message?: string
  date?: string
  desc?: string
}


export interface IScrollWrapper {
  data: any[];
  style?: CSSProperties;
  scrollToBottom?: boolean;
  children?: ReactNode;
}

export interface IMsgBubble {
  data: IPureMsg
  isMe: boolean
}

export interface IChatRecordList {
  onEarlier?: MouseEventHandler;
  data: any[];
  me: IContact;
  style?: CSSProperties;
}

export type IMessageType = "text" | "image"

export interface IMsgItem {
  data: IMessage
  me: IContact
}

export interface IPureMsg {
  type: IMessageType
  content: string
}

export interface IMessage {
  _id: string
  date: number
  user: IContact
  message: IPureMsg
}
