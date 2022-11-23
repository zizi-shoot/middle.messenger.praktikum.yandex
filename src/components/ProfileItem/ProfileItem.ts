import { Component } from '../../core';
import type { ProfileItemProps } from '../../types';
import * as styles from './profile-item.module.css';

export class ProfileItem extends Component<ProfileItemProps> {
  constructor(props: ProfileItemProps) {
    super(
      {
        ...props,
        attributes: { class: styles.container },
      },
      'li',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        <span class="${styles.property}">{{label}}</span>
        <span class="${styles.value}">{{value}}</span>
    `;
  }
}
