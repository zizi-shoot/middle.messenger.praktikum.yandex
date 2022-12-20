import { Component } from '../../core';
import { ProfileItem } from '../ProfileItem';
import { Link } from '../base';
import type { Props } from '../../types/Component';
import type { ProfileItemProps } from '../../types';
import * as styles from './profile-data.module.css';

interface ProfileDataProps extends Props {
  items: ProfileItemProps[],
}

export class ProfileData extends Component<ProfileDataProps> {
  constructor(props: ProfileDataProps) {
    const editDataLink = new Link({ to: '/profile/edit-data', label: 'Изменить данные', class: 'link' });
    const editPasswordLink = new Link({ to: '/profile/edit-password', label: 'Изменить пароль', class: 'link' });
    const logoutLink = new Link({ to: '/signin', label: 'Выйти', class: 'link link--warning' });

    super({
      ...props,
      editDataLink,
      editPasswordLink,
      logoutLink,
    });
  }

  protected render(): string {
    const items = this.props.items.map((props) => new ProfileItem(props));

    this.children = {
      ...this.children,
      items,
    };

    // language=hbs
    return `
        <div>
            <ul class="${styles.data}">
                {{{items}}}
            </ul>
            <nav class="${styles.nav}">
                {{{editDataLink}}}
                {{{editPasswordLink}}}
                {{{logoutLink}}}
            </nav>
        </div>
    `;
  }
}
