import { PinMessageListProps } from "BulletNote/components/types";
import { WholeNoteBlogItemProps, WholeNoteBlockListProps, SortButtonsProps } from "BulletNote/components/NotePart/types";
import { TagNoteBlockItemStates } from "BulletNote/types";

export interface PinMessageListContainerProps extends Omit<PinMessageListProps, 'isShowPinMessageList' | 'toggleShowPinMessageListFn'> {

}

export interface WholeNoteBlogItemContainerProps extends Omit<WholeNoteBlogItemProps, keyof SortButtonsProps | keyof TagNoteBlockItemStates> {
  
}
export interface WholeNoteBlogItemContainerWithCtxProps extends Omit<WholeNoteBlogItemContainerProps, 'isFilteringDone' | 'isShowDateTagDivier'> {
  
}

export interface WholeNoteBlockListContainerProps extends Omit<WholeNoteBlockListProps, 'scrollUpdateStates'> {
  
}
export interface WholeNoteBlockListContainerWithCtxProps extends Omit<WholeNoteBlockListContainerProps, 'tagList' | 'searchingText'> {
  
}