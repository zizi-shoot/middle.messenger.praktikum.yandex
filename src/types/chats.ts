import type { User } from './User';

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
