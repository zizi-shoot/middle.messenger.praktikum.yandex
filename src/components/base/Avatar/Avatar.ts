import classNames from 'classnames';
import { Component } from '@core';
import type { Props } from '@typings/component';
import styles from './avatar.module.css';
import template from './template.hbs';

interface AvatarProps extends Props {
  class?: string,
  size?: number,
  src: string,
  altText: string,
}

export class Avatar extends Component<AvatarProps> {
  protected init() {
    const { src, class: className, size } = this.props;

    this.props.size = size ?? 48;
    this.props.classList = classNames(styles.avatar, className);
    this.props.srcURL = src ? `https://ya-praktikum.tech/api/v2/resources${src}` : '/images/default_avatar.png';
  }

  protected componentDidUpdate() {
    const { src, class: className } = this.props;

    this.props.classList = classNames(styles.avatar, className);
    this.props.srcURL = src ? `https://ya-praktikum.tech/api/v2/resources${src}` : '/images/default_avatar.png';
  }

  protected render() {
    return template;
  }
}
