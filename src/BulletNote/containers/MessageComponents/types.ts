import { BasicMessageItemProps } from "BulletNote/components/types";
import { EditContentProps } from "BulletNote/components/MessageComponents/types";

export interface MessageContentPartContainerProps extends Omit<BasicMessageItemProps, 'isEditing' | 'onConfirmEdit' | 'setEditFn'> {
}

export interface EditContentContainerProps extends Omit<EditContentProps, 'isEditing' | 'setEditFn'> {
  
}