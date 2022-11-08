import { Component } from '../../../core';
import { Input } from '../../base';
import { template } from './ProfileFormField.template';
import type { FormFieldProps } from '../../../types';
import './profile-form-field.css';

export class ProfileFormField extends Component<FormFieldProps> {
  protected init() {
    this.children.input = new Input({ ...this.props });
  }

  protected render(): string {
    return template;
  }
}
