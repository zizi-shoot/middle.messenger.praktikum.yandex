import { Component } from '../../../core';
import { Avatar } from '../../base';
import * as styles from './chat-item.module.css';
import type { ChatInfo } from '../../../types/chats';
import type { Props } from '../../../types/component';

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
  }

  protected render(): string {
    const date = new Date(this.props.last_message?.time);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    // language=hbs
    return `
        <li class="${styles.container}">
            {{{avatar}}}
            <div class="${styles.messageWrapper}">
                <span class="${styles.chatTitle}">{{title}}</span>
                <p class="${styles.message}">{{last_message.content}}</p>
            </div>
            {{#if last_message}}
                <div class="${styles.meta}">
                    <span class="${styles.time}">${time}</span>
                    {{#if unread_counter}}
                        <span class="${styles.counter}">{{unread_counter}}</span>
                    {{/if}}
                </div>
            {{/if}}

        </li>
    `;
  }
}
