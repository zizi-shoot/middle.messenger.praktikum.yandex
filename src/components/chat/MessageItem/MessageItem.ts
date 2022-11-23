import classNames from 'classnames';
import { Component } from '../../../core';
import type { MessageItemProps } from '../../../types';
import * as styles from './message-item.module.css';

export class MessageItem extends Component<MessageItemProps> {
  constructor(props: MessageItemProps) {
    const classList = classNames(
      styles.item,
      props.author === 'me' && styles.itemMe,
      props.class,
    );

    super(
      {
        ...props,
        attributes: { class: classList },
      },
      'li',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        <p class="${styles.text}">{{text}}</p>
        <span class="${styles.time}">{{time}}</span>
    `;
  }
}
