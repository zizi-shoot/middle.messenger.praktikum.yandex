import { Props } from '../core';

export interface FormFieldProps extends Props {
  name: string,
  label: string,
  placeholder?: string,
  helperText?: string,
  hasError: boolean,
}
