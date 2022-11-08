import type { ComponentProps } from './ComponentProps';

export interface ProfileItemProps extends ComponentProps {
  id: string,
  name: string,
  label: string,
  value: string
}
