import type { ComponentProps } from './ComponentProps';

export interface MessageItemProps extends ComponentProps {
  id: string,
  author: string,
  text: string,
  time: string,
  class?: string,
}
