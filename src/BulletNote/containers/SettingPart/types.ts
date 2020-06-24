import { ChangeEvent } from "react";

export interface ToggleFromCtxStates {
  toggle: boolean
}
export interface ToggleFromCtxDispatches {
  handleToggle: (e: ChangeEvent<any>, checked: boolean) => any
}

export interface TagWholePageDateTagToggleContainerProps extends ToggleFromCtxStates, ToggleFromCtxDispatches {
}
export interface TagWholePageDateTagToggleContainerWithCtxProps {
  
}

export interface ShowOverDueMessagesToggleContainerProps extends ToggleFromCtxStates, ToggleFromCtxDispatches {
  
}
export interface ShowOverDueMessagesToggleContainerWithCtxProps {
  
}