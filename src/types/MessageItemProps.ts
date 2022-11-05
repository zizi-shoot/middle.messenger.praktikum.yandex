// eslint-disable-next-line import/no-cycle
import { Props } from '../core';

export interface MessageItemProps extends Props {
  id: string,
  author: string,
  text: string,
  time: string,
  class?: string,
}
