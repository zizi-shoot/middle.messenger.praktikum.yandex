import { Component } from '../../../core';
import { template } from './MessageItem.template';
import type { MessageItemProps } from '../../../types';
import './message-item.css';

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
