import { NavBarProps } from "BulletNote/components/CommonComponents/types";
import { StarLevelNum } from "BulletNote/types";

export interface NavBarContainerProps extends Omit<NavBarProps, 'isDrawerOpen' | 'onToggleDrawer'> {
  
}

export interface StarLevelContainerProps {
  initStarLevelNum: StarLevelNum | undefined
  setStarLevelNumToCtx?: (num: StarLevelNum | undefined) => any
}