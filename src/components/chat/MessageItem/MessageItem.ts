import classNames from 'classnames';
import { Component } from '@core';
import type { Props } from '@typings/component';
import type { Message } from '@typings/messages';
import type { User } from '@typings';
import { Avatar } from '../../base';
import styles from './message-item.module.css';
import template from './template.hbs';

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

    const {
      class: className,
      message,
      isMine,
    } = this.props;

    this.props.itemClassList = classNames(
      styles.item,
      isMine && styles.itemMe,
      className,
    );

    this.props.messageClassList = classNames(
      styles.message,
      isMine && styles.messageMe,
    );

    const date = new Date(message.time);

    this.props.time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
