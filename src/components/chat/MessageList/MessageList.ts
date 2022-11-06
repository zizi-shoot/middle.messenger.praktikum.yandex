import { Component } from '../../../core';
import { template } from './MessageList.template';
import { ComponentChildren, MessageItemProps, ComponentProps } from '../../../types';
import { MessageItem } from '../MessageItem';
import './message-list.css';

interface MessageListProps extends ComponentProps {
  messageList: MessageItemProps[],
}

export class MessageList extends Component<MessageListProps> {
  protected init() {
    const messageList = this.props.messageList.reduce((children: ComponentChildren, messageProps) => {
      children[messageProps.id] = new MessageItem({
        ...messageProps,
        class: `message-list__item ${messageProps.author === 'me' ? 'message-list__item--me message-item--me' : ''}`,
        withInternalID: true,
      });

      return children;
    }, {});

    this.children = {
      ...messageList,
    };
  }

  protected render(): string {
    return template(this.props.messageList.map(({ id }) => id));
  }
}
