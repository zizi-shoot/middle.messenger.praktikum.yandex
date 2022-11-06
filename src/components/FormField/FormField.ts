import { Component } from '../../core';
import { template } from './FormField.template';
import { Input } from '../base';
import './form-field.css';
import { FormFieldProps } from '../../types';

export class FormField extends Component<FormFieldProps> {
  constructor(props: FormFieldProps) {
    const input = new Input({ ...props });

    super({
      ...props,
      children: {
        input,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
