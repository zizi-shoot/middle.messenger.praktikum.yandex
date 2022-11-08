import { Component } from '../../../core';
import { template } from './Input.template';
import type { EventCallback, FormFieldProps } from '../../../types';
import './input.css';

interface InputProps extends FormFieldProps {
  type?: 'text' | 'phone' | 'email',
  class?: string,
  halfWidth?: boolean,
  onBlur?: EventCallback,
  onFocus?: EventCallback,
}

export class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }

  protected init() {
    this.props.events = {
      focus: this.handleFocus.bind(this),
      blur: this.handleBlur.bind(this),
    };
  }

  protected handleBlur(event: FocusEvent) {
    const inputName = this.props.name;
    const input = event.target as HTMLInputElement;
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(inputName, { [inputName]: input.value });
    }
  }

  protected handleFocus() {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus(this.props.name);
    }
  }

  protected render(): string {
    return template;
  }
}
