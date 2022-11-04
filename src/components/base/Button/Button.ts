import { Component, Props } from '../../../core';
import { template } from './Button.template';

interface ButtonProps<T> extends Props<T> {
  text: string,
  fullWidth?: boolean,
  type?: 'button' | 'submit',
  class?: string,
}

export class Button extends Component<ButtonProps<Component>> {
  constructor(props: ButtonProps<Component>) {
    super(props);

    this.props.type = this.props.type || 'button';
  }

  protected render(): string {
    return template;
  }
}
