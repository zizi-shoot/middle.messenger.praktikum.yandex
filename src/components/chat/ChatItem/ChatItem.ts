import { Component } from '../../../core';
import { Avatar } from '../../base';
import type { ChatItemProps } from '../../../types';
import * as styles from './chat-item.module.css';

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
    // language=hbs
    return `
        <li class="${styles.container}">
            {{{avatar}}}
            <div class="${styles.messageWrapper}">
                <span class="${styles.username}">{{userName}}</span>
                <p class="${styles.message}">{{message}}</p>
            </div>
            <div class="${styles.meta}">
                <span class="${styles.time}">{{time}}</span>
                {{#if counter}}
                    <span class="${styles.counter}">{{counter}}</span>
                {{/if}}
            </div>
        </li>
    `;
  }
}
