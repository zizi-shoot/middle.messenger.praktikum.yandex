import classNames from 'classnames';
import { Component } from '../../../core';
import { withChatController } from '../../../hocs/withController';
import { withStore } from '../../../hocs/withStore';
import { ChatItem } from '../ChatItem';
import * as styles from './chat-list.module.css';
import type { PropsWithController } from '../../../types/controller';
import type { State } from '../../../types/store';
import type { ChatController } from '../../../controllers/ChatController';
import type { ChatInfo } from '../../../types/chats';

type ChatsData = State['chats']['data'];

interface ChatListBaseProps extends PropsWithController<ChatController> {
  class?: string,
  chats: {
    data: ChatsData,
  },
}

export class ChatListBase extends Component<ChatListBaseProps> {
  private createChats(chats: ChatInfo[]) {
    return chats.map((chat) => new ChatItem({
      ...chat,
      onClick: () => {
        this.props.controller.selectChat(chat.id);
      },
    }));
  }

  protected componentDidUpdate() {
    this.children.chats = this.createChats(this.props.chats.data);
  }

  protected init() {
    this.children.chats = this.createChats(this.props.chats.data);
  }

  protected render(): string {
    const classList = classNames(styles.container, this.props.class);

    // language=hbs
    return `
        <ul class="${classList}">
            {{{chats}}}
        </ul>
    `;
  }
}

const withChatsData = withStore((state) => ({
  chats: {
    data: [...state.chats.data],
  },
}));

export const ChatList = withChatsData(withChatController(ChatListBase));
