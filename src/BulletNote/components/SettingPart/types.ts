import { ModalProps, CheckboxProps } from "@material-ui/core";

export interface SettingPartProps extends Omit<ModalProps, 'children'> {
  
}

export interface SettingToggleProps extends CheckboxProps {
  label?: string
}

export interface TagWholePageDateTagToggleProps extends SettingToggleProps {
  
}

export interface ShowOverDueMessagesToggleProps extends SettingToggleProps {
  
}