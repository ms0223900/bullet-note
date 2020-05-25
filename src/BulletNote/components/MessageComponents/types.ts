import { StarItemContainerProps, PinItemContainerProps } from "BulletNote/containers/types";
import { MessageItemButtonsProps, BasicMessageItemProps } from "../types";
import { Callback } from "common-types";
import { InputProps } from "../InputPart/types";

export interface EditStates {
  setEditFn: (edit: boolean) => any
  isEditing?: boolean
}

export interface EditContentProps extends InputProps, EditStates {
  content: string
  onEditMessage?: Callback
}

export interface MessageButtonsPartProps extends Omit<BasicMessageItemProps, 'onEditMessage'> {

}

export interface MessageContentPartProps extends BasicMessageItemProps {
}