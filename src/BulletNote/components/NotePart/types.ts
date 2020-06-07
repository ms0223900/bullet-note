import { TagNoteBlockItemProps, MessageList, SortRule, SortTypeRule, StartEndIndex } from "BulletNote/types";
import { UseScrollToUpdateStates } from "lib/customHooks/useScrollToUpdate";
import { BulletNoteState, BulletNoteSetting } from "BulletNote/constants/context";

export interface SortButtonsProps {
  // sortTypeRule: SortTypeRule
  sortByStarNumsFn: (sortRule: SortRule) => any
  sortByDateFn: (sortRule: SortRule) => any
  sortByDueDateFn: (sortRule: SortRule) => any
}

export interface WholeNoteBlogItemProps extends TagNoteBlockItemProps, SortButtonsProps {
  isShowDateTagDivier: BulletNoteState['bulletNoteSetting']['isShowDateTagDivier']
  startEndIndex?: StartEndIndex
}

export interface WholeNoteBlockListCtxStates {
  tagList: string[]
  isShowOverDueMessages: BulletNoteSetting['isShowOverDueMessages']
  searchingText: BulletNoteState['bulletNoteConfig']['searchingText']
}
export interface WholeNoteBlockListProps extends WholeNoteBlockListCtxStates {
  scrollUpdateStates: UseScrollToUpdateStates
  messageList: MessageList
}

export interface WholeNoteBlockDateItemProps {
  date: Date | string
}