import { User } from './User';

export type UserStore = {
  data: User,
  error: ErrorText,
  isLoading: boolean,
};

export type State = {
  user: UserStore,
};
