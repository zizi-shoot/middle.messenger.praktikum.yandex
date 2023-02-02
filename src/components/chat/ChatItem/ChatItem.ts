import { Component } from '../../../core';
import { Avatar } from '../../base';
import styles from './chat-item.module.css';
import template from './template.hbs';
import type { Props } from '../../../types/component';
import type { ChatInfo } from '../../../types/chats';

interface ChatItemProps extends Props, ChatInfo {
}

export class ChatItem extends Component<ChatItemProps> {
  protected init() {
    const { avatar, title } = this.props;

    this.children.avatar = new Avatar({
      size: 48,
      class: 'chat-item__avatar',
      src: avatar,
      altText: `аватар чата ${title}`,
    });

    const date = new Date(this.props.last_message?.time);

    this.props.time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
