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