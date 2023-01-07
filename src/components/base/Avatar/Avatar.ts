import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './avatar.module.css';
import type { Props } from '../../../types/component';

interface AvatarProps extends Props {
  class?: string,
  size?: number,
  src: string,
  altText: string,
}

export class Avatar extends Component<AvatarProps> {
  protected render(): string {
    const srcURL = 'https://ya-praktikum.tech/api/v2/resources';
    const { src, class: className, altText, size } = this.props;
    const classList = classNames(styles.avatar, className);
    const defaultSize = 48;

    // language=hbs
    return `
        <img
                src="${src ? srcURL + src : '/images/default_avatar.png'}"
                alt="${altText}"
                class="${classList}"
                width="${size || defaultSize}"
                height="${size || defaultSize}"
        />
    `;
  }
}
