import classNames from 'classnames';
import { Component } from '../../../core';
import { MessageItem } from '../MessageItem';
import * as styles from './message-list.module.css';
import type { Props } from '../../../types/Component';
import type { MessageItemProps } from '../../../types';

interface MessageListProps extends Props {
  messageList: MessageItemProps[],
  class?: string,
}

export class MessageList extends Component<MessageListProps> {
  constructor(props: MessageListProps) {
    const classList = classNames(styles.container, props.class);
    const messages = props.messageList.map((messageProps) => new MessageItem({
      ...messageProps,
      class: classNames(styles.item, messageProps.author === 'me' && styles.itemMe),
      withInternalID: true,
    }));

    super(
      {
        ...props,
        attributes: { class: classList },
        messages,
      },
      'ul',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        {{{messages}}}
    `;
  }
}
