import { ReactNodeArray, ReactNode } from "react";
import { BoxProps } from "@material-ui/core";

export interface ToggleDisplayWrapperProps extends BoxProps {
  isDisplay?: boolean
  children: ReactNode | ReactNodeArray
}