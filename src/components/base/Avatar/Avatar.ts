import classNames from 'classnames';
import { Component } from '../../../core';
import type { Props } from '../../../types/Component';
import * as styles from './avatar.module.css';

interface AvatarProps extends Props {
  class?: string,
  size?: number,
  src: string,
  altText: string,
}

export class Avatar extends Component<AvatarProps> {
  protected render(): string {
    const { src, class: className, altText, size } = this.props;
    const classList = classNames(styles.avatar, className);
    const defaultSize = 48;

    return `
      <img src="${src}" alt="${altText}" class="${classList}" width="${size || defaultSize}" height="${size || defaultSize}" />
    `;
  }
}
