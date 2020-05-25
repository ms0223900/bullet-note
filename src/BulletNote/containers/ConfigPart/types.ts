import { BulletNoteState, NoteMode } from "BulletNote/constants/context";
import { DueDateButtonProps } from "BulletNote/components/ConfigPart/types";
import { MessageList } from "BulletNote/types";

export interface DaysRangeInputProps {
  initDaysRange: number
  setDaysRangeToCtx: (days: number) => any
}

export interface DaysRangeInputWithCtxProps {
  
}

export interface TagsFilterProps {
  initSelectedFilterTags: string[]
  tags: string[]
  setTagsToCtx: (tags: string[]) => any
}

export interface FilterDoneCheckBoxProps {
  initIsFilteringDone: BulletNoteState['bulletNoteConfig']['isFilteringDone']
  setIsFilteringDoneToCtx: (isFilteringDone: boolean) => any
}

export interface NoteModeSelectorProps {
  selectNoteModeToCtx: (noteMode: NoteMode) => any
  initNoteMode: NoteMode
}
export interface NoteModeSelectorWithCtxProps {
}

export interface DueDateButtonContainerProps extends Omit<DueDateButtonProps, 'dueDateMessageListCount'> {
  messageList: MessageList
}