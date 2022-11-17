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
  constructor(props: AvatarProps) {
    const { src, class: className, altText, size } = props;
    const classList = classNames(styles.avatar, className);
    const defaultSize = 48;

    super(
      {
        ...props,
        attributes: {
          src,
          altText,
          class: classList,
          width: size || defaultSize,
          height: size || defaultSize,
        },
      },
      'img',
    );
  }

  protected render(): string {
    return '';
  }
}
