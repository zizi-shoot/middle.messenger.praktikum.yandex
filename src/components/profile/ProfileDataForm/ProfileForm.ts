import { Children, Component, Props } from '../../../core';
import { template } from './ProfileDataForm.template';
import { Button } from '../../base';
import { FormFieldProps } from '../../../types';
import { ProfileFormField } from '../ProfileFormField';
import './profile-data-form.css';

interface ProfileFormProps extends Props {
  fields: FormFieldProps[],
}

export class ProfileForm extends Component<ProfileFormProps> {
  protected init() {
    const button = new Button({
      text: 'Сохранить',
      type: 'submit',
      class: 'profile-form__btn',
    });

    const fields = this.props.fields.reduce((children: Children, fieldProps) => {
      children[fieldProps.name] = new ProfileFormField({ ...fieldProps });

      return children;
    }, {});

    this.children = {
      button,
      ...fields,
    };
  }

  protected render(): string {
    const fieldNames = this.props.fields.map(({ name }) => name);

    return template(fieldNames);
  }
}
