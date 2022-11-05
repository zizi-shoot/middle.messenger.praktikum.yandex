import { Component, Props } from '../../core';
import { template } from './FormField.template';
import './_form-field.scss';
import { Input } from '../base';

interface FormFieldProps<T> extends Props<T> {
  name: string,
  label: string,
  helperText?: string,
}

export class FormField extends Component<FormFieldProps<Component>> {
  constructor(props: FormFieldProps<Component>) {
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
