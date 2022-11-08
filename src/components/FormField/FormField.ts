import { Component } from '../../core';
import { Input } from '../base';
import { template } from './FormField.template';
import type { FormFieldProps } from '../../types';
import './form-field.css';

export class FormField extends Component<FormFieldProps> {
  protected init() {
    this.children.input = new Input({ ...this.props });
  }

  protected render(): string {
    return template;
  }
}
