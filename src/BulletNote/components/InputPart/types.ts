import { ChangeEvent } from "react";
import { Callback } from "common-types";

export interface InputProps {
  value?: string
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