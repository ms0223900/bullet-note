import { TagNoteBlockItemProps, MessageList } from "BulletNote/types";

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps {
  
}

export interface WholeNoteBlockListProps {
  messageList: MessageList
  tagList: string[]
}

export interface WholeNoteBlockDateItemProps {
  date: Date | string
}