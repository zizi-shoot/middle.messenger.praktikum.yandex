// eslint-disable-next-line import/no-cycle
import { Props } from '../core';

export interface ChatItemProps extends Props {
  id: string,
  userName: string
  userPic: string,
  message: string,
  time: string,
  counter?: number,
}
