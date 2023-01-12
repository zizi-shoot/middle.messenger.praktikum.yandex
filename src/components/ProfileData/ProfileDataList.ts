import { Component } from '../../core';
import { ProfileItem } from '../ProfileItem';
import { Link } from '../base';
import type { Props } from '../../types/component';
import type { ProfileItemProps } from '../../types';
import * as styles from './profile-data.module.css';
import { AuthController } from '../../controllers/AuthController';
import { PropsWithController } from '../../types/controller';
import { withAuthController } from '../../hocs/withController';
import { withUser } from '../../hocs/withStore';

interface ProfileDataProps extends Props, PropsWithController<AuthController> {
  items: ProfileItemProps[],
}

export class ProfileDataListBase extends Component<ProfileDataProps> {
  constructor(props: ProfileDataProps) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  protected init() {
    this.children.editDataLink = new Link({ to: '/profile/edit-data', label: 'Изменить данные', class: 'link' });
    this.children.editPasswordLink = new Link({ to: '/profile/edit-password', label: 'Изменить пароль', class: 'link' });
    this.children.logoutLink = new Link({
      to: '/signin',
      label: 'Выйти',
      class: 'link link--warning',
      onClick: this.handleLogoutClick.bind(this),
    });

    const items = this.props.items.map((props) => new ProfileItem(props));

    this.children = {
      ...this.children,
      items,
    };
  }

  protected handleLogoutClick() {
    this.props.controller.logout();
  }

  protected render(): string {
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

export const ProfileDataList = withUser(withAuthController(ProfileDataListBase));
