import { ComponentProps } from './ComponentProps';

export interface ChatItemProps extends ComponentProps {
  id: string,
  userName: string
  userPic: string,
  message: string,
  time: string,
  counter?: number,
}
