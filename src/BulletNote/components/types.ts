import { MessageList, BasicMessage, MESSAGE_TYPE, TodoMessageStatus, UrgentMessageStatus, StarLevelNum } from "../types";
import { Callback } from "common-types";
import { ReactNode, ChangeEvent } from "react";

export interface NotePartProps {
  messageList: MessageList
  setMessageFromDB: () => any
}

export interface MessageItemButtonsProps {
  onDelete: Callback
  onMoverMessageToLatest: Callback
}

export interface BasicMessageItemProps extends MessageItemButtonsProps {
  value?: string
  message: BasicMessage
  onStarMessage?: (starLevelNum?: StarLevelNum) => any
  onPinMessage?: (isPin?: boolean) => any
  onChangeInput?: (e: ChangeEvent<any>) => any
  onEditMessage?: () => any
}

export interface DefaultMessageItemProps extends Omit<BasicMessageItemProps, 'onDelete' | 'onMoverMessageToLatest'>{
  type: MESSAGE_TYPE.DEFAULT
  status: {}
}

export type ToggleTodoFn = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => any
export interface ToDoMessageItemProps extends Omit<DefaultMessageItemProps, 'type'> {
  type: MESSAGE_TYPE.TODO
  status: TodoMessageStatus
  onToggleTodo?: ToggleTodoFn
}


export interface UrgentMessageItemProps extends Omit<DefaultMessageItemProps, 'type'> {
  type: MESSAGE_TYPE.URGENT
  status: UrgentMessageStatus
}

export interface MessageItemWrapperProps extends BasicMessageItemProps {
  children?: ReactNode
}

export interface DownloadMessageListProps {
  messageList: MessageList
}

export interface PinMessageListProps {
  messageList: MessageList
  isShowPinMessageList?: boolean
  toggleShowPinMessageListFn: Callback
}