import { Component } from '../../core';
import { Avatar, Link } from '../../components/base';
import { Form, ProfileData } from '../../components';
import { profileItemList } from '../../data/profileItemList';
import { validateProfileDataForm, validateProfilePasswordForm } from '../../utils/validation/app/profileDataValidation';
import * as styles from './profile-page.module.css';
import type { ProfileDataForm, ProfilePasswordForm } from '../../utils/validation';

export class ProfilePage extends Component {
  constructor() {
    const avatar = new Avatar({
      size: 128,
      src: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
      altText: 'аватар пользователя Артур Флек',
      class: styles.avatar,
    });
    const userLink = new Link({ to: '#', label: '', class: styles.avatar, children: avatar });

    super({ avatar, userLink });
  }

  protected getContentComponent(contentType: string): Component {
    switch (contentType) {
      case '/profile/edit-data':
        return new Form<ProfileDataForm>({
          name: 'profile',
          handleValidateForm: validateProfileDataForm,
          buttonSubmitText: 'Сохранить',
          mode: 'profile',
        });
      case '/profile/edit-password':
        return new Form<ProfilePasswordForm>({
          name: 'password',
          handleValidateForm: validateProfilePasswordForm,
          buttonSubmitText: 'Сохранить',
          mode: 'profile',

        });
      case '/profile/data':
      default:
        return new ProfileData({ items: profileItemList });
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
        <main class="${styles.container}">
            <h1 class="visually-hidden">Страница профиля</h1>
            <div class="${styles.profile}">
                {{{userLink}}}
                <h2 class="${styles.username}">Артур Флек</h2>
                {{{button}}}
                {{{content}}}
            </div>
        </main>
    `;
  }
}
