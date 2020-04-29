import { StarItemContainerProps, PinItemContainerProps } from "BulletNote/containers/types";
import { MessageItemButtonsProps, BasicMessageItemProps } from "../types";
import { Callback } from "common-types";

export interface MessageButtonsPartProps extends Omit<BasicMessageItemProps, 'onEditMessage'> {

}

export interface MessageContentPartProps extends BasicMessageItemProps {
  onConfirmEdit: Callback
  setEditFn: (edit: boolean) => any
  isEditing?: boolean
}