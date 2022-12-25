import classNames from 'classnames';
import { Component } from '../../../core';
import { MessageItem } from '../MessageItem';
import * as styles from './message-list.module.css';
import type { Props } from '../../../types/component';
import type { MessageItemProps } from '../../../types';

interface MessageListProps extends Props {
  messageList: MessageItemProps[],
  class?: string,
}

export class MessageList extends Component<MessageListProps> {
  protected init() {
    this.children.messages = this.props.messageList.map((messageProps) => new MessageItem({
      ...messageProps,
      class: classNames(styles.item, messageProps.author === 'me' && styles.itemMe),
      withInternalID: true,
    }));
  }

  protected render(): string {
    const classList = classNames(styles.container, this.props.class);

    // language=hbs
    return `
        <ul class="${classList}">
            {{{messages}}}
        </ul>
    `;
  }
}
