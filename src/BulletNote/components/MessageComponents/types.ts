import { StarItemContainerProps, PinItemContainerProps } from "BulletNote/containers/types";
import { MessageItemButtonsProps, BasicMessageItemProps } from "../types";

export interface MessageButtonsPartProps extends Omit<BasicMessageItemProps, 'onEditMessage'> {

}