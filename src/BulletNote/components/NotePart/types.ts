import { TagNoteBlockItemProps, MessageList, SortRule, SortTypeRule } from "BulletNote/types";

export interface SortButtonsProps {
  sortByStarNumsFn: (sortRule: SortRule) => any
}

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps, SortButtonsProps {
  sortTypeRule: SortTypeRule
}

export interface WholeNoteBlockListProps {
  messageList: MessageList
  tagList: string[]
}

export interface WholeNoteBlockDateItemProps {
  date: Date | string
}