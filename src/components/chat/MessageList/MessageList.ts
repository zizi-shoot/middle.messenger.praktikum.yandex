import classNames from 'classnames';
import { Component } from '@core';
import { withStore } from '@hocs/withStore';
import type { State } from '@typings/store';
import type { Props } from '@typings/component';
import { MessageItem } from '../MessageItem';
import styles from './message-list.module.css';
import template from './template.hbs';

type MessagesData = State['messages']['data'];
type SelectedChatUsers = State['chats']['selectedChatUsers'];

interface MessageListBaseProps extends Props {
  class?: string,
  hasMessages?: boolean,
  chatId: ChatID,
  userId: UserID,
  messages: MessagesData,
  chatUsers: SelectedChatUsers,
}

export class MessageListBase extends Component<MessageListBaseProps> {
  protected init() {
    this.props.classList = classNames(styles.container, this.props.class);
    this.props.styles = styles;
  }

  protected componentDidUpdate() {
    const {
      chatId,
      chatUsers,
      userId,
      messages,
    } = this.props;

    if (chatId) {
      const targetChatMessages = messages[chatId];

      this.props.hasMessages = targetChatMessages.length > 0;
      this.children.messages = [...targetChatMessages].reverse().map((message, index, list) => new MessageItem({
        message,
        user: chatUsers[message.user_id],
        class: classNames(styles.item, message.user_id === userId && styles.itemMe),
        isMine: message.user_id === userId,
        isLast: index === list.length - 1,
        withInternalID: true,
      }));
    }
  }

  protected render() {
    return template;
  }
}

const withMessagesData = withStore((state) => ({
  messages: { ...state.messages.data },
  chatUsers: { ...state.chats.selectedChatUsers },
}));

export const MessageList = withMessagesData(MessageListBase);
