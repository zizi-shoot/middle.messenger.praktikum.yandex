import { Component } from '@core';
import { UserController } from '@controllers/UserController';
import { Avatar, Button, Modal } from '@components/base';
import { Form, PageHeader, ProfileDataList } from '@components';
import { validateProfileDataForm, validateProfilePasswordForm } from '@utils/validation/app/profileDataValidation';
import { validateAvatarForm } from '@utils/validation/app/avatarDataValidation';
import { withUser } from '@hocs/withStore';
import { withUserController } from '@hocs/withController';
import { profileItemList } from '@data/profileItemList';
import { removePortal, renderPortal } from '@core/DOM';
import type { User } from '@typings';
import type { AvatarData, ProfileData, ProfilePasswordData } from '@typings/forms';
import type { PropsWithController } from '@typings/controller';
import type { State } from '@typings/store';
import type { Props } from '@typings/component';
import template from './template.hbs';
import styles from './profile-page.module.css';

interface ProfilePageBaseProps extends PropsWithController<UserController>, Pick<State, 'user'>, Props {
  username: string,
}

export class ProfilePageBase extends Component<ProfilePageBaseProps> {
  constructor(props: ProfilePageBaseProps) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { second_name, first_name } = props.user.data;

    super({
      ...props,
      username: `${first_name} ${second_name}`,
    });

    this.updateProfile = this.updateProfile.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this);
  }

  protected componentDidMount() {
    this
      .props
      .controller
      .fetchUser()
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('Не удалось получить данные пользователя!');
      });
  }

  protected componentDidUpdate() {
    (this.children.avatar as Component).setProps({ src: this.props.user.data.avatar });
  }

  protected init() {
    this.children.avatar = new Avatar({
      size: 128,
      src: this.props.user.data.avatar,
      altText: `аватар пользователя ${this.props.user.data.login}`,
    });

    const form = new Form<AvatarData>({
      name: 'avatar',
      title: 'Загрузить новый аватар',
      validateForm: validateAvatarForm,
      submitButtonText: 'Сохранить',
      cancelButtonText: 'Отменить',
      mode: 'profile',
      sentData: this.updateAvatar.bind(this),
      handleCancel: removePortal,
    });

    this.children.avatarBtn = new Button({
      text: '',
      class: styles.avatarBtn,
      mode: 'alt',
      icon: this.children.avatar,
      onClick: () => renderPortal(new Modal({ content: form })),
    });

    this.children.pageHeader = new PageHeader();

    this.props.styles = styles;
  }

  protected async updateProfile(data: FormData) {
    await this.props.controller.updateProfile(data);

    if (this.props.user.error) {
      // eslint-disable-next-line no-alert
      alert(this.props.user.error);
    } else {
      // eslint-disable-next-line no-alert
      alert('Данные пользователя успешно обновлены!');
    }
  }

  protected async updatePassword(data: FormData) {
    await this.props.controller.updatePassword(data);

    if (this.props.user.error) {
      // eslint-disable-next-line no-alert
      alert(this.props.user.error);
    } else {
      // eslint-disable-next-line no-alert
      alert('Пароль пользователя успешно обновлён!');
    }
  }

  protected async updateAvatar(data: FormData) {
    await this.props.controller.updateAvatar(data);

    if (this.props.user.error) {
      // eslint-disable-next-line no-alert
      alert(this.props.user.error);
    } else {
      // eslint-disable-next-line no-alert
      alert('Аватар пользователя успешно обновлён!');
      removePortal();
    }
  }

  protected getContentComponent(contentType: string): Component {
    switch (contentType) {
      case '/profile/edit-data':
        return new Form<ProfileData>({
          name: 'profile',
          validateForm: validateProfileDataForm,
          submitButtonText: 'Сохранить',
          mode: 'profile',
          sentData: this.updateProfile.bind(this),
          values: this.props.user.data,
        });
      case '/profile/edit-password':
        return new Form<ProfilePasswordData>({
          name: 'password',
          validateForm: validateProfilePasswordForm,
          submitButtonText: 'Сохранить',
          mode: 'profile',
          sentData: this.updatePassword.bind(this),
        });
      case '/profile/data':
      default:
        // eslint-disable-next-line no-case-declarations
        const items = profileItemList.map((item) => {
          const value = this.props.user.data[item.key as keyof User];

          return {
            ...item,
            value,
          };
        });

        return new ProfileDataList({ items });
    }
  }

  protected render() {
    // eslint-disable-next-line no-restricted-globals
    const { pathname } = location;
    const content = this.getContentComponent(pathname);

    this.children = {
      ...this.children,
      content,
    };

    // language=hbs
    return template;
  }
}

export const ProfilePage = withUser(withUserController(ProfilePageBase));
