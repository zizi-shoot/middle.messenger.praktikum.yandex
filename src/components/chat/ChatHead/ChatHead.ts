import { Component } from '../../../core';
import { template } from './ChatHead.template';
import { Avatar, Button, Icon } from '../../base';
import './chat-head.css';
import { ComponentProps } from '../../../types';

interface ChatHeadProps extends ComponentProps {
  userName: string,
  userPic: string,
}

export class ChatHead extends Component<ChatHeadProps> {
  protected init() {
    const avatar = new Avatar({
      size: 48,
      src: this.props.userPic,
      altText: `аватар пользователя ${this.props.userName}`,
    });

    const addUserButton = new Button({
      text: 'Добавить пользователя',
      class: 'chat-head__btn',
      mode: 'alt',
      children: {
        icon: new Icon({ type: 'add' }),
      },
    });

    const removeUserButton = new Button({
      text: 'Удалить пользователя',
      class: 'chat-head__btn',
      mode: 'alt',
      children: {
        icon: new Icon({ type: 'remove' }),
      },
    });

    this.children = {
      avatar,
      addUserButton,
      removeUserButton,
    };
  }

  protected render(): string {
    return template;
  }
}
