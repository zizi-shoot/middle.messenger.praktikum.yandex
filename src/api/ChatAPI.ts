import { BaseAPI } from './BaseAPI';
import type { ChatInfo } from '../types/chats';
import type { User } from '../types';

export class ChatAPI extends BaseAPI {
  public update = undefined;

  constructor() {
    super('/chats');
  }

  public create(title: ChatTitle) {
    return this.http.post('', { data: { title } });
  }

  public read(): Promise<ChatInfo[]> {
    return this.http.get('');
  }

  public delete(chatId: ChatID) {
    return this.http.delete('', { data: { chatId } });
  }

  public getUsers(chatId: ChatID): Promise<Array<User & { role: UserRole }>> {
    return this.http.get(`/${chatId}/users`);
  }

  public addUsers(chatId: ChatID, users: UserID[]) {
    return this.http.put('/users', { data: { users, chatId } });
  }

  public deleteUsers(chatId: ChatID, users: UserID[]) {
    return this.http.delete('/users', { data: { users, chatId } });
  }

  async getToken(chatId: ChatID): Promise<ChatToken> {
    const response = await this.http.post<{ token: ChatToken }>(`/token/${chatId}`);

    return response.token;
  }
}
