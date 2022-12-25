import { Component } from '../../core';
import { Avatar, Link } from '../../components/base';
import { Form, PageHeader, ProfileDataList } from '../../components';
import { profileItemList } from '../../data/profileItemList';
import { validateProfileDataForm, validateProfilePasswordForm } from '../../utils/validation/app/profileDataValidation';
import * as styles from './profile-page.module.css';
import type { ProfileData, ProfilePasswordData } from '../../types/forms';
import { withUser } from '../../hocs/withStore';

export class ProfilePageBase extends Component {
  protected init() {
    const avatar = new Avatar({
      size: 128,
      src: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
      altText: 'аватар пользователя Артур Флек',
      class: styles.avatar,
    });

    this.children.userLink = new Link({ to: '#', label: '', class: styles.avatar, children: avatar });
    this.children.pageHeader = new PageHeader();
  }

  protected getContentComponent(contentType: string): Component {
    switch (contentType) {
      case '/profile/edit-data':
        return new Form<ProfileData>({
          name: 'profile',
          validateForm: validateProfileDataForm,
          buttonSubmitText: 'Сохранить',
          mode: 'profile',
          sentData: () => {
          },
        });
      case '/profile/edit-password':
        return new Form<ProfilePasswordData>({
          name: 'password',
          validateForm: validateProfilePasswordForm,
          buttonSubmitText: 'Сохранить',
          mode: 'profile',
          sentData: () => {
          },
        });
      case '/profile/data':
      default:
        return new ProfileDataList({ items: profileItemList });
    }
  }

  protected render(): string {
    // eslint-disable-next-line no-restricted-globals
    const { pathname } = location;

    const content = this.getContentComponent(pathname);

    this.children = {
      ...this.children,
      content,
    };

    // language=hbs
    return `
        <div class="page-container">
            {{{pageHeader}}}
            <main class="${styles.container}">
                <h1 class="visually-hidden">Страница профиля</h1>
                <div class="${styles.profile}">
                    {{{userLink}}}
                    <h2 class="${styles.username}">Артур Флек</h2>
                    {{{button}}}
                    {{{content}}}
                </div>
            </main>
        </div>
    `;
  }
}

export const ProfilePage = withUser(ProfilePageBase);
