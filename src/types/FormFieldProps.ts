import type { InputProps } from '../components/base/Input/Input';

export interface FormFieldProps extends InputProps {
  label: string,
  helperText?: string,
  direction?: 'horizontal' | 'vertical',
  mode?: 'entry' | 'profile',
}
