import { Component } from '../../../core';
import { template } from './ProfileFormField.template';
import './profile-form-field.css';
import { Input } from '../../base';
import { FormFieldProps } from '../../../types';

export class ProfileFormField extends Component<FormFieldProps> {
  protected init() {
    this.children.input = new Input({ ...this.props, halfWidth: true });
  }

  protected render(): string {
    return template;
  }
}
