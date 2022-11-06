import { ComponentProps } from './ComponentProps';

export interface ProfileItemProps extends ComponentProps {
  name: string,
  label: string,
  value: string
}
