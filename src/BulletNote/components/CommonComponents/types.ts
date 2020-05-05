import { Callback } from "common-types";
import { StarLevelNum } from "BulletNote/types";

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