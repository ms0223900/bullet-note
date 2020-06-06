import { Callback } from "common-types";
import { StarLevelNum, DueType } from "BulletNote/types";

export type AddOrMinus = 'add' | 'minus'

export interface NavBarStates {
  isDrawerOpen: boolean
  onToggleDrawer: Callback

  isSettingOpen: boolean
  onToggleSetting: Callback
}

export interface NavBarProps extends NavBarStates {
  isOffline: boolean
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
  dueDateStr: string
  dueType: DueType
}