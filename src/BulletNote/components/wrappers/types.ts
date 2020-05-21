import { ReactNodeArray, ReactNode } from "react";
import { BoxProps } from "@material-ui/core";

export type ReactChildren = ReactNode | ReactNodeArray

export interface ToggleDisplayWrapperProps extends BoxProps {
  isDisplay?: boolean
  children: ReactChildren
}

export interface MoveToBottomWrapperProps extends BoxProps {
  scrollToBottomDeps?: any[]
  children: ReactChildren
}

export interface DelayRenderWrapperProps {
  initShouldRender?: boolean
  delayTimeout?: number
  children: ReactChildren
}