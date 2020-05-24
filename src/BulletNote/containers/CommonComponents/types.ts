import { NavBarProps, DueDateItemProps } from "BulletNote/components/CommonComponents/types";
import { StarLevelNum } from "BulletNote/types";
import { ReactNodeArray, ReactNode } from "react";
import { Callback } from "common-types";
import { ButtonProps } from "@material-ui/core";

export interface NavBarContainerProps extends Omit<NavBarProps, 'isDrawerOpen' | 'onToggleDrawer'> {
  
}

export interface StarLevelContainerProps {
  initStarLevelNum: StarLevelNum | undefined
  setStarLevelNumToCtx?: (num: StarLevelNum | undefined) => any
}

export interface ToggleButtonProps extends ButtonProps {
  onClick?: Callback
  toggleFns: [Callback, Callback]
  toggleEls: [ReactNode, ReactNode]
}

export interface DueDateItemContainerProps extends Omit<DueDateItemProps, 'dueDateStr'> {
}