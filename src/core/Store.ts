import { set } from '../utils';
import { EventBus } from './EventBus';
import type { State } from '../types/store';

export class Store extends EventBus {
  public static EVENT = {
    UPDATED: 'updated',
  };

  private state: State = {
    user: {
      data: {
        avatar: '',
        email: '',
        first_name: '',
        id: '',
        login: '',
        password: '',
        phone: '',
        second_name: '',
      },
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
