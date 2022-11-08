import { Component } from '../../core';
import { template } from './SignInPage.template';
import { formsData } from '../../data/formsData';
import { Button } from '../../components/base';
import { FormField } from '../../components';
import { createChildrenComponents } from '../../utils';
import { ComponentProps } from '../../types';
import '../entry.css';
import { getFormData } from '../../utils/getFormData';
import { SignInPageController } from './SignInPageController';
import { SignInForm } from '../../utils/validation';
import { SignInErrors } from '../../utils/validation/app/signInValidation';

export class SignInPage extends Component<ComponentProps> {
  protected init() {
    const button = new Button({ text: 'Войти', fullWidth: true, type: 'submit' });
    const fields = createChildrenComponents(
      formsData.signin,
      FormField,
      {
        onBlur: this.validateField.bind(this),
        onFocus: this.clearErrors.bind(this),
      },
    );

    this.children = {
      button,
      ...fields,
    };

    this.props.events = {
      submit: (event: SubmitEvent) => {
        event.preventDefault();
        const formData = getFormData(event.target as HTMLFormElement);

        SignInPageController
          .handleSubmit(formData as SignInForm)
          .then(({ status, errors }) => {
            if (status === 'success') {
              console.log(formData);
            }

            this.showErrors(errors);
          })
          .catch(console.warn);
      },
    };
  }

  protected validateField(fieldName: keyof SignInForm, data: SignInForm) {
    const { valid, errors } = SignInPageController.validateField(fieldName, data);

    if (!valid) {
      this.showErrors(errors);
    }
  }

  protected showErrors(errors: SignInErrors) {
    Object.entries(this.children).forEach(([name, component]) => {
      if (name in errors && component instanceof FormField) {
        component.setProps({
          hasError: true,
          helperText: errors[name as keyof SignInErrors],
        });
      }
    });
  }

  protected clearErrors(fieldName: keyof SignInForm) {
    Object.entries(this.children).forEach(([name, component]) => {
      if (name === fieldName && component instanceof FormField) {
        component.setProps({ hasError: false });
      }
    });
  }

  protected render(): string {
    const fields = formsData.signin.map(({ id }) => id);

    return template(fields);
  }
}
