import { BaseAPI } from './BaseAPI';
import type { User } from '../types';
import type { ProfileData } from '../types/forms';

export class UserAPI extends BaseAPI {
  public create = undefined;

  public update = undefined;

  public delete = undefined;

  constructor() {
    super('/user');
  }

  public read(identifier: UserID): Promise<User> {
    return this.http.get(`/${identifier}`);
  }

  public updateProfile(userData: ProfileData) {
    return this.http.put('/profile', { data: userData });
  }

  public updatePassword(oldPassword: Password, newPassword: Password) {
    return this.http.put('/password', { data: { oldPassword, newPassword } });
  }

  public updateAvatar(data: FormData) {
    return this.http.put('/profile/avatar', { data });
  }

  public findUserByLogin(login: Login): Promise<User[]> {
    return this.http.post('/search', { data: { login } });
  }
}
