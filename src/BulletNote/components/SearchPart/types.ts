import { Callback } from "common-types";
import { TextFieldProps } from "@material-ui/core";

export interface SearchPartProps {
  onSearch: Callback
  onClear: Callback
  inputProps: TextFieldProps
}