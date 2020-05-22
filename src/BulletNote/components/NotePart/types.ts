import { TagNoteBlockItemProps, MessageList, SortRule, SortTypeRule, StartEndIndex } from "BulletNote/types";
import { UseScrollToUpdateStates } from "lib/customHooks/useScrollToUpdate";

export interface SortButtonsProps {
  sortTypeRule: SortTypeRule
  sortByStarNumsFn: (sortRule: SortRule) => any
}

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps, SortButtonsProps {
  startEndIndex?: StartEndIndex
}

export interface WholeNoteBlockListProps {
  scrollUpdateStates: UseScrollToUpdateStates
  messageList: MessageList
  tagList: string[]
}

export interface WholeNoteBlockDateItemProps {
  date: Date | string
}