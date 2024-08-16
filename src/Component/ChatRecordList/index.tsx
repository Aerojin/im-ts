import React from "react"
import { IChatRecordList } from "../../Interface"
import cns from "../../Utils/ToClass"
import MsgItem from "../MsgItem"
import style from "./index.module.scss"

const ChatRecordList = (props: IChatRecordList) => {
  return (
    <div className={cns([style.list_area])}>
      <div>
        <button
          type="button"
          className={style.load_more}
          onClick={props.onEarlier}>
          加载更多···
        </button>
      </div>
      {props.data.map((bubble) => (
        <MsgItem {...props} data={bubble} key={bubble._id} />
      ))}
    </div>
  )
}

export default ChatRecordList
