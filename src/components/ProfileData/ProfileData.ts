import { Component } from '../../core';
import { ProfileItem } from '../ProfileItem';
import * as styles from './profile-data.module.css';

import type { Props } from '../../types/Component';
import type { ProfileItemProps } from '../../types';

interface ProfileDataProps extends Props {
  items: ProfileItemProps[],
}

export class ProfileData extends Component<ProfileDataProps> {
  protected render(): string {
    const items = this.props.items.map((props) => new ProfileItem(props));

    this.children = {
      items,
    };

    // language=hbs
    return `
        <ul class="${styles.data}">
            {{{items}}}
        </ul>
        <nav class="${styles.nav}">
            <a href="/profile/edit-data" class="link">Изменить данные</a>
            <a href="/profile/edit-password" class="link">Изменить пароль</a>
            <a href="/signin" class="link link--warning">Выйти</a>
        </nav>
    `;
  }
}
