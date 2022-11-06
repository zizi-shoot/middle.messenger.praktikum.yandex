import { ComponentProps } from './ComponentProps';

export interface FormFieldProps extends ComponentProps {
  name: string,
  label: string,
  placeholder?: string,
  helperText?: string,
  hasError: boolean,
}
