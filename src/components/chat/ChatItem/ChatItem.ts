import { Component } from '../../../core';
import { Avatar } from '../../base';
import { template } from './ChatItem.template';
import { ChatItemProps } from '../../../types';
import './chat-item.css';

export class ChatItem extends Component<ChatItemProps> {
  constructor(props: ChatItemProps) {
    const avatar = new Avatar({
      size: 48,
      class: 'chat-item__avatar',
      src: props.userPic,
      altText: `аватар пользователя ${props.userName}`,
    });

    super({
      ...props,
      children: {
        avatar,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
