import { Component } from '../../../core';
import { Avatar, Button, Icon } from '../../base';
import type { Props } from '../../../types/component';
import * as styles from './chat-head.module.css';

interface ChatHeadProps extends Props {
  userName: string,
  userPic: string,
}

export class ChatHead extends Component<ChatHeadProps> {
  protected init() {
    this.children.avatar = new Avatar({
      size: 48,
      src: this.props.userPic,
      altText: `аватар пользователя ${this.props.userName}`,
    });

    this.children.addUserButton = new Button({
      text: 'Добавить пользователя',
      mode: 'alt',
      icon: new Icon({ type: 'add' }),
    });

    this.children.removeUserButton = new Button({
      text: 'Удалить пользователя',
      mode: 'alt',
      icon: new Icon({ type: 'remove' }),
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.container}">
            <div class="${styles.user}">
                {{{avatar}}}
                <span>{{userName}}</span>
            </div>
            <div class="${styles.controls}">
                {{{addUserButton}}}
                {{{removeUserButton}}}
            </div>
        </div>
    `;
  }
}
