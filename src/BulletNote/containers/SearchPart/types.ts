import { BulletNoteConfig } from "BulletNote/constants/context";

export interface SearchPartContainerStatesFromCtx {
  searchText: BulletNoteConfig['searchingText']
}
export interface SearchPartContainerDispatchesFromCtx {
  setSearchingTextToCtx: (text?: string | number) => any
  setSearchingTagToCtx: () => any
}
export interface SearchPartContainerProps extends SearchPartContainerStatesFromCtx, SearchPartContainerDispatchesFromCtx {
}