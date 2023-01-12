import { Component } from '../../core';
import { Form } from '../../components';
import { AuthController } from '../../controllers/AuthController';
import { validateSignUpForm } from '../../utils/validation/app/signUpValidation';
import { Link } from '../../components/base';
import { withUser } from '../../hocs/withStore';
import { withAuthController } from '../../hocs/withController';
import * as styles from '../entry.module.css';
import type { SignUpData } from '../../types/forms';
import type { PropsWithController } from '../../types/controller';

interface SignUpPageBaseProps extends PropsWithController<AuthController> {
}

export class SignUpPageBase extends Component<SignUpPageBaseProps> {
  constructor(props: SignUpPageBaseProps) {
    super(props);

    this.signUpUser = this.signUpUser.bind(this);
  }

  protected async signUpUser(data: FormData) {
    await this.props.controller.signup(data);
  }

  protected init() {
    this.children.form = new Form<SignUpData>({
      name: 'signup',
      submitButtonText: 'Зарегистрироваться',
      validateForm: validateSignUpForm,
      mode: 'entry',
      sentData: this.signUpUser.bind(this),
    });
    this.children.signInLink = new Link({ to: '/signin', label: 'Войти', class: 'link' });
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
                    <h1 class="${styles.title}">Регистрация</h1>
                    <div class="${styles.helperText}">
                        Уже есть аккаунт?
                        {{{signInLink}}}
                    </div>
                    {{{form}}}
                </section>
            </main>
        </div>
    `;
  }
}

export const SignUpPage = withUser(withAuthController(SignUpPageBase));
