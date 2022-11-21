import type { Props } from './Component';

export interface MessageItemProps extends Props {
  author: string,
  text: string,
  time: string,
  class?: string,
}
