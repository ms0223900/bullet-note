import { TagNoteBlockItemProps, MessageList, SortRule, SortTypeRule, StartEndIndex } from "BulletNote/types";
import { UseScrollToUpdateStates } from "lib/customHooks/useScrollToUpdate";
import { BulletNoteState } from "BulletNote/constants/context";

export interface SortButtonsProps {
  // sortTypeRule: SortTypeRule
  sortByStarNumsFn: (sortRule: SortRule) => any
  sortByDateFn: (sortRule: SortRule) => any
  sortByDueDateFn: (sortRule: SortRule) => any
}

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps, SortButtonsProps {
  startEndIndex?: StartEndIndex
}

export interface WholeNoteBlockListProps {
  scrollUpdateStates: UseScrollToUpdateStates
  messageList: MessageList
  tagList: string[]
  searchingText: BulletNoteState['bulletNoteConfig']['searchingText']
}

export interface WholeNoteBlockDateItemProps {
  date: Date | string
}