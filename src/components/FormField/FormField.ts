import { Component, Props } from '../../core';
import { template } from './FormField.template';
import { Input } from '../base';
import './form-field.scss';

interface FormFieldProps extends Props {
  name: string,
  label: string,
  helperText?: string,
}

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
