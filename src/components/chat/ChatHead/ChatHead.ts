import { Component } from '../../../core';
import { Avatar, Button, Icon } from '../../base';
import type { Props } from '../../../types/Component';
import * as styles from './chat-head.module.css';

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
      mode: 'alt',
      icon: new Icon({ type: 'add' }),
    });

    const removeUserButton = new Button({
      text: 'Удалить пользователя',
      mode: 'alt',
      icon: new Icon({ type: 'remove' }),
    });

    super(
      {
        ...props,
        attributes: { class: styles.container },
        avatar,
        addUserButton,
        removeUserButton,
      },
    );
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.user}">
            {{{avatar}}}
            <span>{{userName}}</span>
        </div>
        <div class="${styles.controls}">
            {{{addUserButton}}}
            {{{removeUserButton}}}
        </div>
    `;
  }
}
