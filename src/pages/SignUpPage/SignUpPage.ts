import { Children, Component, Props } from '../../core';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { template } from './SignUpPage.template';
import { FormField } from '../../components';
import '../common.scss';

export class SignUpPage extends Component<Props> {
  constructor(props: Props) {
    const button = new Button({ text: 'Зарегистрироваться', fullWidth: true, type: 'submit' });
    const inputs = formsData.signup.reduce((children: Children, inputProps) => {
      children[inputProps.name] = new FormField({ ...inputProps });

      return children;
    }, {});

    super({
      ...props,
      children: {
        ...inputs,
        button,
      },
    });
  }

  protected render(): string {
    const inputs = formsData.signup.map(({ name }) => name);
    return template(inputs);
  }
}
