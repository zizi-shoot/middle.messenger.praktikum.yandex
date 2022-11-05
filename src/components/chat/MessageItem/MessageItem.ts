import { Component } from '../../../core';
import { MessageItemProps } from '../../../types';
import { template } from './MessageItem.template';
import './message-item.css';

export class MessageItem extends Component<MessageItemProps> {
  protected render(): string {
    return template;
  }
}
