import { ReactNodeArray, ReactNode } from "react";
import { BoxProps } from "@material-ui/core";

export type ReactChildren = ReactNode | ReactNodeArray

export interface ToggleDisplayWrapperProps extends BoxProps {
  isDisplay?: boolean
  children: ReactChildren
}

export interface MoveToBottomWrapperProps {
  scrollToBottomDeps?: any[]
  children: ReactChildren
}