import { set } from '../utils';
import { EventBus } from './EventBus';
import type { State } from '../types/store';

export class Store extends EventBus {
  public static EVENT = {
    UPDATED: 'updated',
  };

  private state: State = {
    isAuth: false,
    user: {
      data: {
        avatar: '',
        email: '',
        first_name: '',
        display_name: '',
        id: 0,
        login: '',
        phone: '',
        second_name: '',
      },
      error: null,
      isLoading: false,
    },
    chats: {
      data: [],
      error: null,
      isLoading: false,
      selectedChatId: null,
      selectedChatUsers: {},
    },
    messages: {
      data: {},
      error: null,
      isLoading: false,
    },
  };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(Store.EVENT.UPDATED, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();
// TODO Убрать перед PR
// @ts-ignore
window.store = store;
