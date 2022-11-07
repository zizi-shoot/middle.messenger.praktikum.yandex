import { Component } from '../../../core';
import { template } from './MessageList.template';
import { MessageItem } from '../MessageItem';
import { ComponentProps, MessageItemProps } from '../../../types';
import { createChildrenComponents } from '../../../utils';
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
