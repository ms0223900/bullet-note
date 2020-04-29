import { BasicMessageItemProps } from "BulletNote/components/types";

export interface MessageContentPartContainerProps extends Omit<BasicMessageItemProps, 'isEditing' | 'onConfirmEdit' | 'setEditFn'> {
}