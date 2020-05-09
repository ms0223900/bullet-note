import { ID, Callback } from "common-types";
import { ToDoMessageItemProps, UrgentMessageItemProps, DefaultMessageItemProps, ToggleTodoFn } from "./components/types";
import { BulletNoteState } from "./constants/context";
import { RouterProps, RouteChildrenProps } from "react-router";
import { TagNoteBlockItemContainerWithCtxProps } from "./containers/types";

type RawMessage = string
export type StarLevelNum = number

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
  starLevelNum?: StarLevelNum
  rawMessage: RawMessage
  createdAt?: string | Date
}

export interface BasicMessage {
  id: string
  starLevelNum?: StarLevelNum
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

export interface WeekFromTo {
  weekFrom: Date
  weekTo: Date
  weekFromToStr?: string
}

export interface SingleMessageListWithDateSplitByWeek extends WeekFromTo {
  messageListWithDateList: MessageListWithDate[]
}

export interface NoteBlockItemProps extends NoteBlockItem {
  selected?: boolean
  selectedFilterTags: BulletNoteState['bulletNoteConfig']['selectedFilterTags']
  isFilteringDone: BulletNoteState['bulletNoteConfig']['isFilteringDone']
}

export interface TagNoteBlockItem {
  tagTitle: string
  messageList: MessageList
}

export interface TagNoteBlockItemProps extends TagNoteBlockItem {
  toggleShowMessagesFn: Callback
  isShowMessages: boolean
  isFilteringDone: BulletNoteState['bulletNoteConfig']['isFilteringDone']
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
  singleMessageListWithDateSplitByWeek: SingleMessageListWithDateSplitByWeek
}

export interface NoteWeekBlockProps {
  messageList: MessageList
}

export interface DateTitleProps {
    date: Date | string
  }

export interface BulletNoteRouteProps extends RouteChildrenProps {

}

