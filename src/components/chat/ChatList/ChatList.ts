import classNames from 'classnames';
import { Component } from '@core';
import { withChatController } from '@hocs/withController';
import { withStore } from '@hocs/withStore';
import type { PropsWithController } from '@typings/controller';
import type { State } from '@typings/store';
import type { ChatController } from '@controllers/ChatController';
import type { ChatInfo } from '@typings/chats';
import type { Props } from '@typings/component';
import template from './template.hbs';
import styles from './chat-list.module.css';
import { ChatItem } from '../ChatItem';

type ChatsData = State['chats']['data'];

interface ChatListBaseProps extends PropsWithController<ChatController>, Props {
  class?: string,
  chats: {
    data: ChatsData,
  },
}

export class ChatListBase extends Component<ChatListBaseProps> {
  private createChats(chats: ChatInfo[]) {
    return chats.map((chat) => new ChatItem({
      ...chat,
      onClick: async () => {
        const { controller } = this.props;

        controller.selectChat(chat.id);
        // eslint-disable-next-line no-alert
        controller.fetchChatUsers(chat.id).catch(() => alert('Не удалось получить данные пользователей!'));
      },
    }));
  }

  protected componentDidUpdate() {
    this.children.chats = this.createChats(this.props.chats.data);
  }

  protected init() {
    this.children.chats = this.createChats(this.props.chats.data);
    this.props.classList = classNames(styles.container, this.props.class);
  }

  protected render() {
    return template;
  }
}

const withChatsData = withStore((state) => ({
  chats: {
    data: [...state.chats.data],
  },
}));

export const ChatList = withChatsData(withChatController(ChatListBase));
