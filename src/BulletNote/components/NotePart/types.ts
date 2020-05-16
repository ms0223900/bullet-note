import { TagNoteBlockItemProps, MessageList } from "BulletNote/types";

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps {
  
}

export interface WholeNoteBlockListProps {
  messageList: MessageList
  tagList: string[]
}