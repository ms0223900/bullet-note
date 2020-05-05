import { MessageItemWrapperProps, BasicMessageItemProps, ToDoMessageItemProps, ToggleTodoFn, MessageItemButtonsProps } from "../components/types";
import { TagNoteBlockItemProps, NoteBlockListProps, NoteBlockListWithCtxProps, StarLevelNum } from "../types";
import { BulletNoteState } from "BulletNote/constants/context";
import { MessageButtonsPartProps } from "BulletNote/components/MessageComponents/types";

export interface InputPartContainerProps {
  tags: string[]
  addMessageFn: (rawMessage: string) => any
}

export interface MessageItemWrapperContainerProps extends MessageItemWrapperProps {

}

export interface MessageItemWrapperContainerWithCtxProps extends Omit<
MessageItemWrapperProps, keyof MessageItemButtonsProps> {
  
}

export interface TagNoteBlockItemContainerProps extends Omit<TagNoteBlockItemProps, 'onToggleTodo' | 'toggleShowMessagesFn' | 'isShowMessages'> {}

export interface TagNoteBlockItemContainerWithCtxProps extends Omit<TagNoteBlockItemContainerProps, 'toggleTodoAction'> {
}

export interface BasicMessageItemContainerProps extends Omit<BasicMessageItemProps, 'onEditMessage'> {
  editActionFn: (id: string, newMessage: string) => any
  starActionFn: (id: string, starLevelNum?: StarLevelNum) => any
  pinActionFn: (id: string, isPin?: boolean) => any
}
export interface BasicMessageItemContainerWithCtxProps extends Omit<BasicMessageItemContainerProps, 
  'editActionFn' | 
  'starActionFn' | 
  'pinActionFn'
> {
  
}

export interface TodoMessageItemContainerProps extends Omit<ToDoMessageItemProps, 'onToggleTodo'> {
  toggleTodoActionFn: (id: string, isTodo: boolean) => any
}

export interface TodoMessageItemContainerWithCtxProps extends Omit<
TodoMessageItemContainerProps, 'toggleTodoActionFn'> {}

export interface StarItemContainerProps {
  starLevelNum?: boolean
  onChange?: (starLevelNum?: boolean) => any
}

export interface PinItemContainerProps {
  isPin?: boolean
  onChange?: (isPin?: boolean) => any
}

export interface NoteBlockListContainerProps extends Omit<NoteBlockListWithCtxProps, 'moveToBottomFn'> {
  
}

export interface SyncToFirebaseProps {
  messageList: BulletNoteState['messageList']
}