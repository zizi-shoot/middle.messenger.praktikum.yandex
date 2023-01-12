import { BaseAPI } from './BaseAPI';
import type { SignInData, SignUpData } from '../types/forms';
import type { User } from '../types';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signin(data: SignInData) {
    return this.http.post('/signin', { data });
  }

  public signup(data: SignUpData) {
    return this.http.post('/signup', { data });
  }

  public read(): Promise<User> {
    return this.http.get('/user');
  }

  public logout() {
    return this.http.post('/logout');
  }

  public create = undefined;

  public update = undefined;

  public delete = undefined;
}
