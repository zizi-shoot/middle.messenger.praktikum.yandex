import { Component } from '../../../core';
import { template } from './MessageItem.template';
import './message-item.css';
import { MessageItemProps } from '../../../types';

export class MessageItem extends Component<MessageItemProps> {
  protected init() {
    if (this.props.author === 'me') {
      this.props.class += ' message-list__item--me message-item--me';
    }
  }

  protected render(): string {
    return template;
  }
}
