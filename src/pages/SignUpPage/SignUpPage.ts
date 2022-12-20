import { Component } from '../../core';
import { Form } from '../../components';
import { validateSignUpForm } from '../../utils/validation/app/signUpValidation';
import { Link } from '../../components/base';
import type { SignUpForm } from '../../utils/validation';
import * as styles from '../entry.module.css';

export class SignUpPage extends Component {
  constructor() {
    const form = new Form<SignUpForm>({
      name: 'signup',
      buttonSubmitText: 'Зарегистрироваться',
      handleValidateForm: validateSignUpForm,
      mode: 'entry',
    });
    const signInLink = new Link({ to: '/signin', label: 'Войти', class: 'link' });

    super({ form, signInLink });
  }

  protected render(): string {
    // language=hbs
    return `
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
    `;
  }
}
