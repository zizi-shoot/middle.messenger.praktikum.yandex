import { Component } from '@core';
import { Form } from '@components';
import { AuthController } from '@controllers/AuthController';
import { validateSignUpForm } from '@utils/validation/app/signUpValidation';
import { Link } from '@components/base';
import { withUser } from '@hocs/withStore';
import { withAuthController } from '@hocs/withController';
import type { SignUpData } from '@typings/forms';
import type { PropsWithController } from '@typings/controller';
import type { Props } from '@typings/component';
import template from './template.hbs';
import styles from '../entry.module.css';

interface SignUpPageBaseProps extends PropsWithController<AuthController>, Props {
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
    this.children.signInLink = new Link({ to: '/signin', label: 'Войти', classList: 'link' });

    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}

export const SignUpPage = withUser(withAuthController(SignUpPageBase));
