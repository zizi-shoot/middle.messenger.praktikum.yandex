import { AuthController } from '../../controllers/AuthController';
import { Component } from '../../core';
import { Form } from '../../components';
import { validateSignInForm } from '../../utils/validation/app/signInValidation';
import { Link } from '../../components/base';
import { withUser } from '../../hocs/withStore';
import { withAuthController } from '../../hocs/withController';
import template from './template.hbs';
import styles from '../entry.module.css';
import type { PropsWithController } from '../../types/controller';
import type { State } from '../../types/store';
import type { Props } from '../../types/component';
import type { SignInData } from '../../types/forms';

interface SignInPageBaseProps extends PropsWithController<AuthController>, Pick<State, 'user'>, Props {
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

    this.children.signUpLink = new Link({ to: '/signup', label: 'Зарегистрироваться', classList: 'link' });

    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}

export const SignInPage = withUser(withAuthController(SignInPageBase));
