import type { ComponentProps } from './ComponentProps';

export interface FormFieldProps extends ComponentProps {
  id: string
  name: string,
  label: string,
  placeholder?: string,
  helperText?: string,
  hasError: boolean,
}
