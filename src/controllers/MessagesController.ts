import { WSTransport } from '../core/WSTransport';
import { Store, store as _store } from '../core/Store';
// eslint-disable-next-line import/no-cycle
import { chatController } from './ChatController';
import type { Message, OldMessage } from '../types/messages';

export class MessagesController {
  private transports: Record<ChatID, WSTransport> = [];

  constructor(
    private readonly store: Store,
  ) {
  }

  private onMessageReceived(chatId: ChatID, message: Message | OldMessage[]) {
    let type;

    if (Array.isArray(message)) {
      type = 'messages';
    } else {
      type = message.type;
    }

    const messagesState = this.store.getState().messages.data[chatId];
    const oldMessages = messagesState ?? [];

    switch (type) {
      case 'message':
        this.store.set(`messages.data.${chatId}`, [...oldMessages, message]);
        chatController.fetchChats();

        break;
      case 'messages':
        this.store.set(`messages.data.${chatId}`, [...oldMessages, ...(message as OldMessage[]).reverse()]);

        break;
      default:
        break;
    }
  }

  private onConnectionClosed(chatId: ChatID) {
    delete this.transports[chatId];
  }

  public async connect(chatId: ChatID) {
    if (this.transports[chatId]) {
      return;
    }

    const token = await chatController.getToken(chatId);
    const userId = this.store.getState().user.data.id;
    const transport = new WSTransport(`/${userId}/${chatId}/${token}`);

    await transport.connect();

    transport.subscribe(WSTransport.EVENT.MESSAGE, this.onMessageReceived.bind(this, chatId));
    transport.subscribe(WSTransport.EVENT.CLOSE, this.onConnectionClosed.bind(this, chatId));
    this.transports[chatId] = transport;
    this.fetchOldMessages(chatId);
  }

  public fetchOldMessages(chatId: ChatID) {
    const transport = this.transports[chatId];

    if (!transport) {
      throw new Error('Connection is not established yet!');
    }

    transport.send({
      type: 'get old',
      content: '0',
    });
  }

  public async sendMessage(chatId: ChatID, content: MessageContent) {
    const transport = this.transports[chatId];

    if (!transport) {
      throw new Error('Connection is not established yet!');
    }

    transport.send({
      type: 'message',
      content,
    });
  }

  public closeAll() {
    Object.values(this.transports).forEach((transport) => transport.close());
  }
}

export const messagesController = new MessagesController(_store);
