import { ID, Callback } from "common-types";
import { ToDoMessageItemProps, UrgentMessageItemProps, DefaultMessageItemProps, ToggleTodoFn } from "./components/types";
import { BulletNoteState } from "./constants/context";
import { RouterProps, RouteChildrenProps } from "react-router";

type RawMessage = string

export enum MESSAGE_TYPE  {
  'DEFAULT' = 'DEFAULT',
  'URGENT' = 'URGENT',
  'TODO' = 'TODO',
  'REVIEW' = 'REVIEW',
}

export interface TagItem {
  id: ID
  name: string
}

export interface BulletTagItemProps {
  tagName: string
}

export interface BulletTagListProps {
  tagList: TagItem[]
}

export interface DateTagItem {
    date: Date
  }

export interface UrgentMessageStatus {
    dueTime: Date
    urgentLevel: number
    name: string
  }

export interface TodoMessageStatus {
  name: string
  isDone?: boolean
  dueTime?: Date | string
}

export interface SingleRawMessageFromDB {
  id: string
  isDone?: boolean
  isPin?: boolean
  isStared?: boolean
  rawMessage: RawMessage
  createdAt?: string | Date
}

export interface BasicMessage {
  id: string
  isStared?: boolean
  isPin?: boolean
  rawMessage: RawMessage
  content: string
  tagList: TagItem[]
  createdAt: Date | string
  dateTagList: DateTagItem[]
}

export type MessageItem = 
  ToDoMessageItemProps | 
  UrgentMessageItemProps | 
  DefaultMessageItemProps

export type MessageList = MessageItem[]

export interface MessageListWithDate {
    date: Date | string
    messageList: MessageList
  }

export interface NoteBlockItem extends MessageListWithDate {

}
export interface NoteBlockItemProps extends NoteBlockItem {
  selected?: boolean
  selectedFilterTags: BulletNoteState['bulletNoteConfig']['selectedFilterTags']
}

export interface TagNoteBlockItem {
  tagTitle: string
  messageList: MessageList
}

export interface TagNoteBlockItemProps extends TagNoteBlockItem {
  toggleShowMessagesFn: Callback
  isShowMessages: boolean
}
export type TagNoteBlockList = TagNoteBlockItem[]
export interface TagNoteBlockObj {
  [x: string]: TagNoteBlockItem
}

export interface TagNoteBlockItemProps extends TagNoteBlockItem {}
export interface TagNoteBlockListProps {
  tagNoteBlockList: TagNoteBlockList
}

export interface NoteBlockListProps extends NoteBlockListWithCtxProps {
  bulletNoteConfig: BulletNoteState['bulletNoteConfig']
}

export interface NoteBlockListWithCtxProps {
  messageList: MessageList
  moveToBottomFn: Callback
}

export interface DateTitleProps {
    date: Date | string
  }

export interface BulletNoteRouteProps extends RouteChildrenProps {

}

