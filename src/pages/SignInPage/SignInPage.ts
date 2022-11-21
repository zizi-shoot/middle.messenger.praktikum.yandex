import { Component } from '../../core';
import { Form } from '../../components';
import { validateSignInForm } from '../../utils/validation/app/signInValidation';
import * as styles from '../entry.module.css';
import type { SignInForm } from '../../utils/validation';

export class SignInPage extends Component {
  constructor() {
    const form = new Form<SignInForm>({
      name: 'signin',
      buttonSubmitText: 'Войти',
      handleValidateForm: validateSignInForm,
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
            <h1 class="${styles.title}">Вход в аккаунт</h1>
            <p class="${styles.helperText}">
                Ещё нет аккаунта?
                <a class="link" href="/signup">Зарегистрироваться</a>
            </p>
            {{{form}}}
        </section>
        <a href="/" class="${styles.homeLink}">🏠</a>
    `;
  }
}
