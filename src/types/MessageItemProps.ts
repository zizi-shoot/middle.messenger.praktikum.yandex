import type { Props } from './component';

export interface MessageItemProps extends Props {
  author: string,
  text: string,
  time: string,
  class?: string,
}
