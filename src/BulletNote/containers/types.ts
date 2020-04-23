import { MessageItemWrapperProps, BasicMessageItemProps, ToDoMessageItemProps, ToggleTodoFn } from "../components/types";
import { TagNoteBlockItemProps, NoteBlockListProps, NoteBlockListWithCtxProps } from "../types";
import { BulletNoteState } from "BulletNote/constants/context";

export interface InputPartContainerProps {
  addMessageFn: (rawMessage: string) => any
}

export interface MessageItemWrapperContainerProps extends MessageItemWrapperProps {

}

export interface MessageItemWrapperContainerWithCtxProps extends Omit<
MessageItemWrapperProps, 'onDelete'> {
  
}

export interface TagNoteBlockItemContainerProps extends Omit<TagNoteBlockItemProps, 'onToggleTodo' | 'toggleShowMessagesFn' | 'isShowMessages'> {}

export interface TagNoteBlockItemContainerWithCtxProps extends Omit<TagNoteBlockItemContainerProps, 'toggleTodoAction'> {
}

export interface BasicMessageItemContainerProps extends Omit<BasicMessageItemProps, 'onEditMessage'> {
  editActionFn: (id: string, newMessage: string) => any
  starActionFn: (id: string, isStar?: boolean) => any
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
  isStared?: boolean
  onChange?: (isStar?: boolean) => any
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