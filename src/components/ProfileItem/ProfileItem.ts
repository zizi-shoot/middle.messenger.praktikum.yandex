import { Component } from '../../core';
import type { ProfileItemProps } from '../../types';
import * as styles from './profile-item.module.css';

export class ProfileItem extends Component<ProfileItemProps> {
  protected render(): string {
    // language=hbs
    return `
        <li class="${styles.container}">
            <span class="${styles.property}">{{label}}</span>
            <span class="${styles.value}">{{value}}</span>
        </li>
    `;
  }
}
