import type { Props } from './component';
import type { User } from './User';

export interface ChatItemProps extends Props {
  userName: string
  userPic: string,
  message: string,
  time: string,
  counter?: number,
}

export interface ChatInfo {
  id: ChatID,
  title: ChatTitle,
  avatar: AvatarType,
  unread_count: number,
  last_message: {
    user: User,
    time: ChatTime,
    content: ChatContent
  }
}
