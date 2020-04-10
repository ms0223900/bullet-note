import { ChangeEvent } from "react";
import { Callback } from "common-types";

export interface InputPartProps {
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any
  onSendMessage?: Callback
}