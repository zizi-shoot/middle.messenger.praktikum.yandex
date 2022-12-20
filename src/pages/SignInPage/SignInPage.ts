import { Component } from '../../core';
import { Form } from '../../components';
import { validateSignInForm } from '../../utils/validation/app/signInValidation';
import { Link } from '../../components/base';
import type { SignInForm } from '../../utils/validation';
import * as styles from '../entry.module.css';

export class SignInPage extends Component {
  constructor() {
    const form = new Form<SignInForm>({
      name: 'signin',
      buttonSubmitText: 'Войти',
      handleValidateForm: validateSignInForm,
      mode: 'entry',
    });
    const signUpLink = new Link({ to: '/signup', label: 'Зарегистрироваться', class: 'link' });

    super({ form, signUpLink });
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
                <h1 class="${styles.title}">Вход в аккаунт</h1>
                <div class="${styles.helperText}">
                    Ещё нет аккаунта?
                    {{{signUpLink}}}
                </div>
                {{{form}}}
            </section>
        </main>
    `;
  }
}
