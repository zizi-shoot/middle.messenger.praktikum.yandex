import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './message-item.module.css';
import { Props } from '../../../types/component';
import { Message } from '../../../types/messages';

export interface MessageItemProps extends Props {
  message: Message,
  class?: string,
  isMine: boolean,
}

export class MessageItem extends Component<MessageItemProps> {
  protected render(): string {
    const classList = classNames(
      styles.item,
      this.props.isMine && styles.itemMe,
      this.props.class,
    );

    const date = new Date(this.props.message.time);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    // language=hbs
    return `
        <li class="${classList}">
            <p class="${styles.text}">{{message.content}}</p>
            <span class="${styles.time}">${time}</span>
        </li>
    `;
  }
}
