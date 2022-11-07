import { Component } from '../../core';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { FormField } from '../../components';
import { template } from './SignUpPage.template';
import { createChildrenComponents } from '../../utils';
import '../entry.css';

export class SignUpPage extends Component {
  protected init() {
    const button = new Button({ text: 'Зарегистрироваться', fullWidth: true, type: 'submit' });
    const fields = createChildrenComponents(
      formsData.signup,
      FormField,
    );

    this.children = {
      button,
      ...fields,
    };
  }

  protected render(): string {
    const fields = formsData.signup.map(({ id }) => id);
    return template(fields);
  }
}
