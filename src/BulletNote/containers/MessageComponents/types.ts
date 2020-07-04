import { BasicMessageItemProps } from "BulletNote/components/types";
import { EditContentProps, EditStates } from "BulletNote/components/MessageComponents/types";

export interface MessageContentPartContainerProps extends Omit<BasicMessageItemProps, 'isEditing' | 'onConfirmEdit' | 'setEditFn'> {
}

export interface EditContentContainerProps extends Omit<EditContentProps, keyof EditStates | 'onKeyDown' | 'onKeyUp'> {
  
}