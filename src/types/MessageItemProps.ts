import type { Props } from './Component';

export interface MessageItemProps extends Props {
  id: string,
  author: string,
  text: string,
  time: string,
  class?: string,
}
