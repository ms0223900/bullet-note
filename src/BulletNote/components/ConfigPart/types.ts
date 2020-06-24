import { Callback } from "common-types";
import { SettingPartProps } from "../SettingPart/types";
import { SettingPartStates } from "../CommonComponents/types";

export interface DueDateButtonProps {
  dueDateMessageListCount: number
  setDueDateModeFn: Callback
}

export interface ConfigPartProps extends SettingPartStates {
  
}