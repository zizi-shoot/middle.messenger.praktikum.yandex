import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './message-list.module.css';
import type { Props } from '../../../types/component';
import { State } from '../../../types/store';
import { withStore } from '../../../hocs/withStore';
import { MessageItem } from '../MessageItem';

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
  protected componentDidUpdate() {
    if (this.props.chatId) {
      const targetChatMessages = this.props.messages[this.props.chatId];

      this.props.hasMessages = targetChatMessages.length > 0;
      this.children.messages = [...targetChatMessages].reverse().map((message, index, list) => new MessageItem({
        message,
        user: this.props.chatUsers[message.user_id],
        class: classNames(styles.item, message.user_id === this.props.userId && styles.itemMe),
        isMine: message.user_id === this.props.userId,
        isLast: index === list.length - 1,
        withInternalID: true,
      }));
    }
  }

  protected render(): string {
    const classList = classNames(styles.container, this.props.class);

    // language=hbs
    return `
        <ul class="${classList}">
            {{#if hasMessages}}
                {{{messages}}}
            {{else}}
                <span class="${styles.emptyMessage}">Нет сообщений</span>
            {{/if}}
        </ul>
    `;
  }
}

const withMessagesData = withStore((state) => ({
  messages: { ...state.messages.data },
  chatUsers: { ...state.chats.selectedChatUsers },
}));

export const MessageList = withMessagesData(MessageListBase);
