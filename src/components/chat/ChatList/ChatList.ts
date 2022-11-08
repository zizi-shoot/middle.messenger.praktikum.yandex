import { Component } from '../../../core';
import { ChatItem } from '../ChatItem';
import { template } from './ChatList.template';
import { createChildrenComponents } from '../../../utils';
import type { ChatItemProps, ComponentProps } from '../../../types';
import './chat-list.css';

interface ChatListProps extends ComponentProps {
  items: ChatItemProps[],
}

export class ChatList extends Component<ChatListProps> {
  protected init() {
    const chatItems = createChildrenComponents(
      this.props.items,
      ChatItem,
      { withInternalID: true },
    );

    this.children = {
      ...chatItems,
    };
  }

  protected render(): string {
    return template(this.props.items.map(({ id }) => id));
  }
}
