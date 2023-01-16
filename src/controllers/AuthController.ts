import { AuthAPI } from '@api';
import { ROUTES } from '@utils/const';
import type { Store } from '@core/Store';
import type { Router } from '@core/Router';
import { store as _store } from '../core/Store';
// eslint-disable-next-line import/no-cycle
import { router as _router } from '../core/Router';
import { messagesController } from './MessagesController';
import type { SignInData, SignUpData } from '../types/forms';

export class AuthController {
  constructor(
    private readonly api: AuthAPI,
    private readonly router: Router,
    private readonly store: Store,
  ) {
  }

  private async request(req: () => void) {
    this.store.set('user.isLoading', true);
    this.store.set('user.error', null);

    try {
      await req();
    } catch (e: any) {
      this.store.set('user.error', e.reason);
    } finally {
      this.store.set('user.isLoading', false);
    }
  }

  public async signup(data: FormData) {
    const objectData = Object.fromEntries(data) as SignUpData;

    await this.request(async () => {
      await this.api.signup(objectData);
      await this.fetchUser();

      this.store.set('isAuth', true);
      this.router.go(ROUTES.PROFILE);
    });
  }

  public async signin(data: FormData) {
    const objectData = Object.fromEntries(data) as SignInData;

    await this.request(async () => {
      await this.api.signin(objectData);
      await this.fetchUser();

      this.store.set('isAuth', true);
      this.router.go(ROUTES.INDEX);
    });
  }

  public async fetchUser() {
    await this.request(async () => {
      const user = await this.api.read();

      this.store.set('user.data', user);
      this.store.set('isAuth', true);
    });
  }

  public async logout() {
    await this.request(async () => {
      await this.api.logout();

      messagesController.closeAll();

      this.store.set('isAuth', false);
      this.router.go(ROUTES.SIGNIN);
    });
  }
}

export const authController = new AuthController(
  new AuthAPI(),
  _router,
  _store,
);
