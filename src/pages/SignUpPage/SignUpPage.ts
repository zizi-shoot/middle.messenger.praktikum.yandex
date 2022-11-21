import { Component } from '../../core';
import { Form } from '../../components';
import { validateSignUpForm } from '../../utils/validation/app/signUpValidation';
import * as styles from '../entry.module.css';
import type { SignUpForm } from '../../utils/validation';

export class SignUpPage extends Component {
  constructor() {
    const form = new Form<SignUpForm>({
      name: 'signup',
      buttonSubmitText: 'Зарегистрироваться',
      handleValidateForm: validateSignUpForm,
      mode: 'entry',
    });

    super(
      {
        attributes: { class: styles.container },
        form,
      },
      'main',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        <section class="${styles.section}">
            <picture>
                <source srcset="images/logo.webp" type="image/webp" />
                <img src="images/logo.png" alt="логотип летчат" />
            </picture>
            <h1 class="${styles.title}">Регистрация</h1>
            <p class"${styles.helperText}">
                    Уже есть аккаунт?
            <a class="link" href="/signin">Войти</a>
            </p>
            {{{form}}}
        </section>
        <a href="/" class="${styles.homeLink}">🏠</a>
    `;
  }
}
