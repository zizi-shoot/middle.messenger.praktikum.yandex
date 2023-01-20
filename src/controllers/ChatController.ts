import { store as _store } from '../core/Store';
// eslint-disable-next-line import/no-cycle
import { messagesController } from './MessagesController';
import { userController } from './UserController';
import { User } from '../types';
import { ChatAPI } from '../api';
import type { Store } from '../core/Store';

export class ChatController {
  constructor(
    private readonly api: ChatAPI,
    private readonly store: Store,
  ) {
  }

  private async request(req: () => void) {
    this.store.set('chats.isLoading', true);
    this.store.set('chats.error', null);

    try {
      await req();
    } catch (e: any) {
      this.store.set('chats.error', e.reason);
    } finally {
      this.store.set('user.isLoading', false);
    }
  }

  public async create(data: FormData) {
    const title = data.get('title') as ChatTitle;

    if (title) {
      await this.request(async () => {
        await this.api.create(title);
        await this.fetchChats();
      });
    }
  }

  public async delete(chatId: ChatID) {
    await this.request(async () => {
      await this.api.delete(chatId);
      await this.fetchChats();
    });
  }

  public async fetchChats() {
    await this.request(async () => {
      const chats = await this.api.read();

      await Promise.all(chats.map((chat) => messagesController.connect(chat.id)));

      this.store.set('chats.data', chats);
    });
  }

  public getToken(chatId: ChatID) {
    return this.api.getToken(chatId);
  }

  public async addUserToChat(chatId: ChatID, data: FormData) {
    const login = data.get('login') as Login;

    if (login) {
      await this.request(async () => {
        const user = await userController.findUserByLogin(login);

        await this.api.addUsers(chatId, [user[0]?.id]);
      });
    }
  }

  public async deleteUserFromChat(chatId: ChatID, data: FormData) {
    const login = data.get('login') as Login;

    if (login) {
      await this.request(async () => {
        const user = await userController.findUserByLogin(login);

        if (user.length > 0) {
          await this.api.deleteUsers(chatId, [user[0].id]);
        }
      });
    }
  }

  public selectChat(chatId: ChatID) {
    this.store.set('chats.selectedChatId', chatId);
  }

  public async fetchChatUsers(chatId: ChatID) {
    await this.request(async () => {
      const users = await this.api.getUsers(chatId);
      const usersById = users.reduce((acc, user) => {
        acc[user.id] = user;

        return acc;
      }, {} as Record<UserID, User>);

      this.store.set('chats.selectedChatUsers', usersById);
    });
  }
}

export const chatController = new ChatController(
  new ChatAPI(),
  _store,
);
