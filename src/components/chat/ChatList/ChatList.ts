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
    const items = chatListItems.map((itemProps) => new ChatItem({ ...itemProps, withInternalID: true }));

    super(
      {
        ...props,
        items,
      },
    );
  }

  protected render(): string {
    const classList = classNames(styles.container, this.props.class);

    // language=hbs
    return `
        <form class="${classList}">
            {{{items}}}
        </form>
    `;
  }
}
