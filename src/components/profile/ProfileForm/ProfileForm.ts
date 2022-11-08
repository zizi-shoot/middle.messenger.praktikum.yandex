import { Component } from '../../../core';
import { template } from './ProfileForm.template';
import { Button } from '../../base';
import { ComponentProps, FormFieldProps } from '../../../types';
import { ProfileFormField } from '../ProfileFormField';
import './profile-form.css';
import { createChildrenComponents } from '../../../utils';
import { ProfileErrors } from '../../../utils/validation/app/profileDataValidation';
import { ProfileDataForm, ProfilePasswordForm } from '../../../utils/validation';
import { ProfileFormController } from './ProfileFormController';
import { getFormData } from '../../../utils/getFormData';

interface ProfileFormProps extends ComponentProps {
  fields: FormFieldProps[],
}

export class ProfileForm extends Component<ProfileFormProps> {
  protected init() {
    const button = new Button({
      text: 'Сохранить',
      type: 'submit',
      class: 'profile-form__btn',
    });

    const fields = createChildrenComponents(
      this.props.fields,
      ProfileFormField,
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

    ProfileFormController
      .handleSubmit(formData as ProfileDataForm)
      .then(({ status, errors }) => {
        if (status === 'success') {
          console.log(formData);
        }

        this.showErrors(errors);
      })
      .catch(console.warn);
  }

  protected validateField<FormType extends ProfileDataForm | ProfilePasswordForm>(fieldName: keyof FormType, data: FormType) {
    const { valid, errors } = ProfileFormController.validateField(fieldName, data);

    if (!valid) {
      this.showErrors(errors);
    }
  }

  protected showErrors<FormType extends ProfileDataForm | ProfilePasswordForm>(errors: ProfileErrors<FormType>) {
    Object.entries(this.children).forEach(([name, component]) => {
      if (name in errors && component instanceof ProfileFormField) {
        component.setProps({
          hasError: true,
          helperText: errors[name as keyof ProfileErrors<FormType>],
        });
      }
    });
  }

  protected clearErrors<FormType extends ProfileDataForm | ProfilePasswordForm>(fieldName: keyof FormType) {
    Object.entries(this.children).forEach(([name, component]) => {
      if (name === fieldName && component instanceof ProfileFormField) {
        component.setProps({ hasError: false });
      }
    });
  }

  protected render(): string {
    const fields = this.props.fields.map(({ id }) => id);

    return template(fields);
  }
}
