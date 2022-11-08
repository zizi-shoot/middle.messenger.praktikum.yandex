import { Component } from '../../core';
import { Button } from '../../components/base';
import { FormField } from '../../components';
import { SignUpPageController } from './SignUpPageController';
import { template } from './SignUpPage.template';
import { createChildrenComponents } from '../../utils';
import { getFormData } from '../../utils/getFormData';
import { formsData } from '../../data/formsData';
import type { SignUpForm } from '../../utils/validation';
import type { SignUpErrors } from '../../utils/validation/app/signUpValidation';
import type { ComponentProps } from '../../types';
import '../entry.css';

export class SignUpPage extends Component<ComponentProps> {
  protected init() {
    const button = new Button({ text: 'Зарегистрироваться', fullWidth: true, type: 'submit' });
    const fields = createChildrenComponents(
      formsData.signup,
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
      submit: this.handleSubmit.bind(this),
    };
  }

  protected handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = getFormData(event.target as HTMLFormElement);

    SignUpPageController
      .handleSubmit(formData as SignUpForm)
      .then(({ status, errors }) => {
        if (status === 'success') {
          // eslint-disable-next-line no-console
          console.log(formData);
        }

        this.showErrors(errors);
      })
      // eslint-disable-next-line no-console
      .catch(console.warn);
  }

  protected validateField(fieldName: keyof SignUpForm, data: SignUpForm) {
    const { valid, errors } = SignUpPageController.validateField(fieldName, data);

    if (!valid) {
      this.showErrors(errors);
    }
  }

  protected showErrors(errors: SignUpErrors) {
    Object.entries(this.children).forEach(([name, component]) => {
      if (name in errors && component instanceof FormField) {
        component.setProps({
          hasError: true,
          helperText: errors[name as keyof SignUpErrors],
        });
      }
    });
  }

  protected clearErrors(fieldName: keyof SignUpForm) {
    Object.entries(this.children).forEach(([name, component]) => {
      if (name === fieldName && component instanceof FormField) {
        component.setProps({ hasError: false });
      }
    });
  }

  protected render(): string {
    const fields = formsData.signup.map(({ id }) => id);
    return template(fields);
  }
}
