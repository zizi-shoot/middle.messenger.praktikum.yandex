import { Component } from '../../core';
import { AuthController } from '../../controllers/AuthController';
import { Form } from '../../components';
import { validateSignInForm } from '../../utils/validation/app/signInValidation';
import { Link } from '../../components/base';
import { withAuthController } from '../../hocs/withController';
import { withUser } from '../../hocs/withStore';
import * as styles from '../entry.module.css';
import type { SignInData } from '../../types/forms';
import type { PropsWithController } from '../../types/controller';
import type { State } from '../../types/store';

interface SignInPageBaseProps extends PropsWithController<AuthController>, Pick<State, 'user'> {
}

class SignInPageBase extends Component<SignInPageBaseProps> {
  constructor(props: SignInPageBaseProps) {
    super(props);

    this.signInUser = this.signInUser.bind(this);
  }

  protected async signInUser(data: FormData) {
    await this.props.controller.signin(data);

    if (this.props.user.error) {
      // eslint-disable-next-line no-alert
      alert(this.props.user.error);
    }
  }

  protected init() {
    this.children.form = new Form<SignInData>({
      name: 'signin',
      submitButtonText: 'Войти',
      validateForm: validateSignInForm,
      mode: 'entry',
      sentData: this.signInUser.bind(this),
    });

    this.children.signUpLink = new Link({ to: '/signup', label: 'Зарегистрироваться', class: 'link' });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="page-container">
            <main class="${styles.container}">
                <section class="${styles.section}">
                    <picture>
                        <source srcset="images/logo.webp" type="image/webp" />
                        <img src="images/logo.png" alt="логотип летчат" />
                    </picture>
                    <h1 class="${styles.title}">Вход в аккаунт</h1>
                    <div class="${styles.helperText}">
                        Ещё нет аккаунта?
                        {{{signUpLink}}}
                    </div>
                    {{{form}}}
                </section>
            </main>
        </div>
    `;
  }
}

export const SignInPage = withUser(withAuthController(SignInPageBase));
