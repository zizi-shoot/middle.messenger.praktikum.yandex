import { Component } from '../../../core';
import { MessageItem } from '../MessageItem';
import { createChildrenComponents } from '../../../utils';
import { template } from './MessageList.template';
import type { ComponentProps, MessageItemProps } from '../../../types';
import './message-list.css';

interface MessageListProps extends ComponentProps {
  messageList: MessageItemProps[],
}

export class MessageList extends Component<MessageListProps> {
  protected init() {
    const messageList = createChildrenComponents(
      this.props.messageList,
      MessageItem,
      {
        class: 'message-list__item',
        withInternalID: true,
      },
    );

    this.children = {
      ...messageList,
    };
  }

  protected render(): string {
    return template(this.props.messageList.map(({ id }) => id));
  }
}
