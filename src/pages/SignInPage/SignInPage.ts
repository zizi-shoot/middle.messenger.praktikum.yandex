import { Component } from '../../core';
import { template } from './SignInPage.template';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { FormField } from '../../components';
import '../entry.css';
import { ComponentChildren } from '../../types';

export class SignInPage extends Component {
  protected init() {
    const button = new Button({ text: 'Войти', fullWidth: true, type: 'submit' });
    const fields = formsData.signin.reduce((children: ComponentChildren, fieldProps) => {
      children[fieldProps.name] = new FormField({ ...fieldProps });

      return children;
    }, {});

    this.children = {
      button,
      ...fields,
    };
  }

  protected render(): string {
    return template;
  }
}
