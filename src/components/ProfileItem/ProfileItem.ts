import { Component } from '../../core';
import * as styles from './profile-item.module.css';
import type { ProfileItemProps } from '../../types';

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
