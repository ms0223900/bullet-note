import { TagNoteBlockItemProps, MessageList, SortRule, SortTypeRule } from "BulletNote/types";

export interface SortButtonsProps {
  sortTypeRule: SortTypeRule
  sortByStarNumsFn: (sortRule: SortRule) => any
}

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps, SortButtonsProps {
}

export interface WholeNoteBlockListProps {
  messageList: MessageList
  tagList: string[]
}

export interface WholeNoteBlockDateItemProps {
  date: Date | string
}