import { Component } from '../../../core';
import { template } from './MessageItem.template';
import './message-item.css';

export class MessageItem extends Component {
  protected render(): string {
    return template;
  }
}
