import { Component } from '../../core';
import { Link } from '../base';
import { ProfileItem } from '../ProfileItem';
import { AuthController } from '../../controllers/AuthController';
import { withUser } from '../../hocs/withStore';
import { withAuthController } from '../../hocs/withController';
import styles from './profile-data.module.css';
import template from './template.hbs';
import type { Props } from '../../types/component';
import type { PropsWithController } from '../../types/controller';
import type { ProfileItemProps } from '../../types';

interface ProfileDataProps extends Props, PropsWithController<AuthController> {
  items: ProfileItemProps[],
}

export class ProfileDataListBase extends Component<ProfileDataProps> {
  constructor(props: ProfileDataProps) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  protected init() {
    this.children.editDataLink = new Link({ to: '/profile/edit-data', label: 'Изменить данные', classList: 'link' });
    this.children.editPasswordLink = new Link({ to: '/profile/edit-password', label: 'Изменить пароль', classList: 'link' });
    this.children.logoutLink = new Link({
      to: '/signin',
      label: 'Выйти',
      classList: 'link link--warning',
      onClick: this.handleLogoutClick.bind(this),
    });

    const items = this.props.items.map((props) => new ProfileItem(props));

    this.children = {
      ...this.children,
      items,
    };

    this.props.styles = styles;
  }

  protected handleLogoutClick() {
    this.props.controller.logout();
  }

  protected render() {
    return template;
  }
}

export const ProfileDataList = withUser(withAuthController(ProfileDataListBase));
