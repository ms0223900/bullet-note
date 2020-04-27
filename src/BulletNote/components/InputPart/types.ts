import { ChangeEvent } from "react";
import { Callback } from "common-types";

export interface InputPartProps extends TagListProps {
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
  onSendMessage?: Callback
}

export interface TagListProps {
  label?: string
  tagValue: string | undefined
  tags: string[]
  onChangeSelect: (e: ChangeEvent<any>) => any
}