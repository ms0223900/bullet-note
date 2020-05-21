import { PinMessageListProps } from "BulletNote/components/types";
import { WholeNoteBlogItemProps, WholeNoteBlockListProps } from "BulletNote/components/NotePart/types";
import { TagNoteBlockItemStates } from "BulletNote/types";

export interface PinMessageListContainerProps extends Omit<PinMessageListProps, 'isShowPinMessageList' | 'toggleShowPinMessageListFn'> {

}

export interface WholeNoteBlogItemContainerProps extends Omit<WholeNoteBlogItemProps, keyof WholeNoteBlogItemProps> {

}
export interface WholeNoteBlogItemContainerWithCtxProps extends Omit<WholeNoteBlogItemContainerProps, 'isFilteringDone'> {
  
}

export interface WholeNoteBlockListContainerProps extends WholeNoteBlockListProps {
  
}
export interface WholeNoteBlockListContainerWithCtxProps extends Omit<WholeNoteBlockListContainerProps, 'tagList'> {
  
}