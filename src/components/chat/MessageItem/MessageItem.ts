import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './message-item.module.css';
import type { Props } from '../../../types/component';
import type { Message } from '../../../types/messages';
import type { User } from '../../../types';
import { Avatar } from '../../base';

export interface MessageItemProps extends Props {
  message: Message,
  class?: string,
  isMine: boolean,
  user: User,
}

export class MessageItem extends Component<MessageItemProps> {
  protected init() {
    if (this.props.user) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { avatar, display_name } = this.props.user;

      this.children.avatar = new Avatar({
        size: 42,
        src: avatar,
        altText: `Аватар пользователя ${display_name}`,
      });
    }
  }

  protected render(): string {
    const {
      class: className,
      message,
      isMine,
    } = this.props;

    const itemClassList = classNames(
      styles.item,
      isMine && styles.itemMe,
      className,
    );

    const messageClassList = classNames(
      styles.message,
      isMine && styles.messageMe,
    );

    const date = new Date(message.time);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    // language=hbs
    return `
        <li class="${itemClassList}">
            {{{avatar}}}
            <div class="${messageClassList}">
                <p class="${styles.text}">
                    {{#if isMine}}
                    {{else}}
                        <b>{{user.first_name}}: </b>
                    {{/if}}
                    {{message.content}}
                </p>
                <span class="${styles.time}">${time}</span>
            </div>
        </li>
    `;
  }
}
