import { UserAPI } from '../api';
import type { Store } from '../core/Store';
import { store as _store } from '../core/Store';
import type { Router } from '../core/Router';
import { router as _router } from '../core/Router';
import { ROUTES } from '../utils/const';
import type { ProfileData, ProfilePasswordData } from '../types/forms';
import type { User } from '../types';

export class UserController {
  constructor(
    private readonly api: UserAPI,
    private readonly router: Router,
    private readonly store: Store,
  ) {
  }

  private async request(req: () => void) {
    this.store.set('user.isLoading', true);

    try {
      await req();

      this.store.set('user.error', null);
    } catch (e: any) {
      this.store.set('user.error', e.reason);
    } finally {
      this.store.set('user.isLoading', false);
    }
  }

  public async updateProfile(data: FormData) {
    const objectData = Object.fromEntries(data) as ProfileData;

    await this.request(async () => {
      await this.api.updateProfile(objectData);
      await this.fetchUser();

      this.router.go(ROUTES.PROFILE);
    });
  }

  public async updatePassword(data: FormData) {
    const { oldPassword, newPassword } = Object.fromEntries(data) as ProfilePasswordData;

    await this.request(async () => {
      await this.api.updatePassword(oldPassword, newPassword);
      await this.fetchUser();

      this.router.go(ROUTES.PROFILE);
    });
  }

  public async updateAvatar(data: FormData) {
    await this.request(async () => {
      await this.api.updateAvatar(data);
      await this.fetchUser();
    });
  }

  public async fetchUser() {
    await this.request(async () => {
      const { id } = this.store.getState().user.data;
      const user = await this.api.read(id);

      this.store.set('user.data', user);
    });
  }

  public async findUserByLogin(login: Login): Promise<User[]> {
    return this.api.findUserByLogin(login);
  }
}

export const userController = new UserController(
  new UserAPI(),
  _router,
  _store,
);
