import { Component } from '../../core';
import { Avatar } from '../../components/base';
import { ProfileData } from '../../components/profile/ProfileData';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { profileItemList } from '../../data/profileItemList';
import { template } from './ProfilePage.template';
import { formsData } from '../../data/formsData';
import './profile-page.css';

export class ProfilePage extends Component {
  protected init() {
    const avatar = new Avatar({
      size: 128,
      src: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
      altText: 'аватар пользователя Артур Флек',
      class: 'profile__avatar',
    });

    const content = this.getContentComponent('edit-password');

    this.children = {
      avatar,
      content,
    };
  }

  protected getContentComponent(contentType: string): Component {
    switch (contentType) {
      case 'edit-data':
        return new ProfileForm({
          fields: formsData.profile,
        });
      case 'edit-password':
        return new ProfileForm({
          fields: formsData.password,
        });
      case 'data':
      default:
        return new ProfileData({ items: profileItemList });
    }
  }

  protected render(): string {
    return template;
  }
}
