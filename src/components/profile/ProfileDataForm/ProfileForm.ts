import { Component } from '../../../core';
import { template } from './ProfileDataForm.template';
import { Button } from '../../base';
import { ComponentProps, FormFieldProps } from '../../../types';
import { ProfileFormField } from '../ProfileFormField';
import './profile-data-form.css';
import { createChildrenComponents } from '../../../utils';

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
    );

    this.children = {
      button,
      ...fields,
    };
  }

  protected render(): string {
    const fields = this.props.fields.map(({ id }) => id);

    return template(fields);
  }
}
