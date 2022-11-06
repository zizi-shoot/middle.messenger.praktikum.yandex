import { Children, Component } from '../../core';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { template } from './SignUpPage.template';
import { FormField } from '../../components';
import '../entry.css';

export class SignUpPage extends Component {
  protected init() {
    const button = new Button({ text: 'Зарегистрироваться', fullWidth: true, type: 'submit' });
    const fields = formsData.signup.reduce((children: Children, inputProps) => {
      children[inputProps.name] = new FormField({ ...inputProps });

      return children;
    }, {});

    this.children = {
      button,
      ...fields,
    };
  }

  protected render(): string {
    const inputs = formsData.signup.map(({ name }) => name);
    return template(inputs);
  }
}
