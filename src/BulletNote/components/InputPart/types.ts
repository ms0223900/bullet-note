import { ChangeEvent, KeyboardEvent } from "react";
import { Callback } from "common-types";

export interface InputProps {
  value?: string
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => any
  onKeyUp: (e: KeyboardEvent<HTMLTextAreaElement>) => any
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
}

export interface InputPartProps extends TagListProps, InputProps {
  onSendMessage?: Callback
}

export interface TagListProps {
  label?: string
  tagValue: string | undefined
  tags: string[]
  onChangeSelect: (e: ChangeEvent<any>) => any
}