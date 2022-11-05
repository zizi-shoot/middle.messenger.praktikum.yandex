import { Children, Component, Props } from '../../core';
import { template } from './SignInPage.template';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { FormField } from '../../components';
import '../entry.css';

export class SignInPage extends Component<Props> {
  constructor(props: Props) {
    const inputs = formsData.signin.reduce((children: Children, { name, label }) => {
      children[name] = new FormField({ label, name });

      return children;
    }, {});
    const button = new Button({ text: 'Войти', fullWidth: true, type: 'submit' });

    super({
      ...props,
      children: {
        ...inputs,
        button,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
