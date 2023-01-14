import classNames from 'classnames';
import { Component } from '../../../core';
import { MessageList } from '../MessageList';
import { MessageForm } from '../MessageForm';
import * as styles from './chat-body.module.css';
import { State } from '../../../types/store';
import { withChats, withMessages, withUser } from '../../../hocs/withStore';
import type { Props } from '../../../types/component';

interface ChatBodyBaseProps extends State, Props {
  class?: string,
  hasMessages?: boolean,
}

export class ChatBodyBase extends Component<ChatBodyBaseProps> {
  protected init() {
    const { user, chats } = this.props;

    this.children.messageForm = new MessageForm();
    this.children.messageList = new MessageList({
      class: styles.messageList,
      chatId: chats.selectedChatId,
      userId: user.data.id,
    });
  }

  protected componentDidUpdate() {
    const { selectedChatId } = this.props.chats;

    (this.children.messageList as Component).setProps({ chatId: selectedChatId });
    (this.children.messageForm as Component).setProps({ chatId: selectedChatId });
  }

  protected render(): string {
    const {
      class: className,
      chats,
      hasMessages,
    } = this.props;

    const classList = classNames(
      styles.container,
      className,
      !chats.selectedChatId && styles.containerEmpty,
      !hasMessages && styles.containerEmptyMessages,
    );

    // language=hbs
    return `
        <div class="${classList}">
            {{#if chats.selectedChatId}}
                {{{messageList}}}
                <div class="${styles.divider}"></div>
                {{{messageForm}}}
            {{else}}
                <span class="${styles.emptyMessage}">Выберите чат</span>
            {{/if}}
        </div>
    `;
  }
}

export const ChatBody = withChats(withUser(withMessages(ChatBodyBase)));
