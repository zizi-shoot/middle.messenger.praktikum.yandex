import classNames from 'classnames';
import { Component } from '../../../core';
import { ChatItem } from '../ChatItem';
import { chatListItems } from '../../../data/chatListItems';
import * as styles from './chat-list.module.css';
import type { Props } from '../../../types/Component';

interface ChatListProps extends Props {
  class?: string,
}

export class ChatList extends Component<ChatListProps> {
  constructor(props: ChatListProps) {
    const classList = classNames(styles.container, props.class);
    const items = chatListItems.map((itemProps) => new ChatItem({ ...itemProps, withInternalID: true }));

    super(
      {
        attributes: { class: classList },
        items,
      },
      'form',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        {{{items}}}
    `;
  }
}
