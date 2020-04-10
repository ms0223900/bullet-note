import { MessageList, BasicMessage, MESSAGE_TYPE, TodoMessageStatus, UrgentMessageStatus } from "../types";
import { Callback } from "common-types";
import { ReactNode, ChangeEvent } from "react";

export interface NotePartProps {
  messageList: MessageList
  setMessageFromDB: () => any
}

export interface MessageItemButtonsProps {
  onDelete: Callback
}

export interface BasicMessageItemProps extends MessageItemButtonsProps {
  message: BasicMessage
  onStarMessage?: (isStar?: boolean) => any
  onPinMessage?: (isPin?: boolean) => any
  onEditMessage?: (e: ChangeEvent<HTMLElement>) => any
}

export interface DefaultMessageItemProps extends Omit<BasicMessageItemProps, 'onDelete'>{
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
  children: ReactNode
}

export interface DownloadMessageListProps {
  messageList: MessageList
}

export interface PinMessageListProps {
  messageList: MessageList
}