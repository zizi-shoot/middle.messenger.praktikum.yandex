import { User } from './User';
import { ChatInfo } from './chats';
import { OldMessage } from './messages';

export type PartStore<T> = {
  data: T,
  error: ErrorText,
  isLoading: boolean,
};

export type State = {
  isAuth: boolean,
  user: PartStore<User>,
  chats: PartStore<ChatInfo[]> & { selectedChatId: ChatID | null },
  messages: PartStore<Record<ChatID, OldMessage[]>>,
};
