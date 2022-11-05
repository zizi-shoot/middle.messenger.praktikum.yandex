import { Component, Props } from '../../../core';
import { template } from './ChatHead.template';
import { Avatar, Button, Icon } from '../../base';
import './chat-head.scss';

interface ChatHeadProps extends Props {
  userName: string,
  userPic: string,
}

export class ChatHead extends Component<ChatHeadProps> {
  constructor(props: ChatHeadProps) {
    const avatar = new Avatar({
      size: 48,
      src: props.userPic,
      altText: `аватар пользователя ${props.userName}`,
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

    super({
      ...props,
      children: {
        avatar,
        addUserButton,
        removeUserButton,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
