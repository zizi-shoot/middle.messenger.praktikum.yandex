import type { Props } from './Component';

export interface ChatItemProps extends Props {
  userName: string
  userPic: string,
  message: string,
  time: string,
  counter?: number,
}
