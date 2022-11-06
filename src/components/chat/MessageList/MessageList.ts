import { Children, Component, Props } from '../../../core';
import { template } from './MessageList.template';
import { MessageItemProps } from '../../../types';
import { MessageItem } from '../MessageItem';
import './message-list.css';

interface MessageListProps extends Props {
  messageList: MessageItemProps[],
}

export class MessageList extends Component<MessageListProps> {
  protected init() {
    const messageList = this.props.messageList.reduce((children: Children, messageProps) => {
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
