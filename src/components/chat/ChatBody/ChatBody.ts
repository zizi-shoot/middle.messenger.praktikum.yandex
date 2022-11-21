import classNames from 'classnames';
import { Component } from '../../../core';
import { MessageList } from '../MessageList';
import { MessageForm } from '../MessageForm';
import { messages } from '../../../data/messages';
import * as styles from './chat-body.module.css';
import type { Props } from '../../../types/Component';

interface ChatBodyProps extends Props {
  class?: string,
}

export class ChatBody extends Component<ChatBodyProps> {
  constructor(props: ChatBodyProps) {
    const classList = classNames(
      styles.container,
      props.class,
      messages.length === 0 && styles.containerEmpty,
    );
    const messageList = new MessageList({ messageList: messages, class: styles.messageList });
    const messageForm = new MessageForm({});

    super(
      {
        ...props,
        attributes: { class: classList },
        messageList,
        messageForm,
      },
    );

    this.props.hasMessages = messages.length > 0;
  }

  protected render(): string {
    // language=hbs
    return `
        {{#if hasMessages}}
            {{{messageList}}}
            <div class="${styles.divider}"></div>
            {{{messageForm}}}
        {{else}}
            <span class="${styles.emptyMessage}">Выберите чат, чтобы отправить сообщение</span>
        {{/if}}
    `;
  }
}
