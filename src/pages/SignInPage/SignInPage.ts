import { Component } from '../../core';
import { template } from './SignInPage.template';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { FormField } from '../../components';
import '../entry.css';
import { createChildrenComponents } from '../../utils';

export class SignInPage extends Component {
  protected init() {
    const button = new Button({ text: 'Войти', fullWidth: true, type: 'submit' });
    const fields = createChildrenComponents(
      formsData.signin,
      FormField,
    );

    this.children = {
      button,
      ...fields,
    };
  }

  protected render(): string {
    const fields = formsData.signin.map(({ id }) => id);

    return template(fields);
  }
}
