import classNames from 'classnames';
import { Component } from '../../../core';
import type { MessageItemProps } from '../../../types';
import * as styles from './message-item.module.css';

export class MessageItem extends Component<MessageItemProps> {
  protected render(): string {
    const classList = classNames(
      styles.item,
      this.props.author === 'me' && styles.itemMe,
      this.props.class,
    );

    // language=hbs
    return `
        <li class="${classList}">
            <p class="${styles.text}">{{text}}</p>
            <span class="${styles.time}">{{time}}</span>
        </li>
    `;
  }
}
