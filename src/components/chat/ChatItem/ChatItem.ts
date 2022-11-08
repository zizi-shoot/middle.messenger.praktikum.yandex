import { Component } from '../../../core';
import { Avatar } from '../../base';
import { template } from './ChatItem.template';
import type { ChatItemProps } from '../../../types';
import './chat-item.css';

export class ChatItem extends Component<ChatItemProps> {
  protected init() {
    this.children.avatar = new Avatar({
      size: 48,
      class: 'chat-item__avatar',
      src: this.props.userPic,
      altText: `аватар пользователя ${this.props.userName}`,
    });
  }

  protected render(): string {
    return template;
  }
}
