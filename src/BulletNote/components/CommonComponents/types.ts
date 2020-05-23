import { Callback } from "common-types";
import { StarLevelNum, DueType } from "BulletNote/types";

export type AddOrMinus = 'add' | 'minus'

export interface NavBarProps {
  isOffline: boolean
  isDrawerOpen: boolean
  onToggleDrawer: Callback
}

export interface UserNotFoundPageProps {
  errorMessage: string
}

export interface StarLevelProps {
  starLevelNum: StarLevelNum
  onAddOrMinus: (addOrMinus: AddOrMinus) => () => any
}

export interface MoveToBottomButtonProps {
  moveToBottomFn: Callback
}
export interface MoveToTopButtonProps {
  moveToTopFn: Callback
}

export interface DueDateItemProps {
  date: Date
  dueType: DueType
}