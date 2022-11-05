import { Component, Props } from '../../../core';
import { template } from './Button.template';
import './button.scss';

interface ButtonProps extends Props {
  text: string,
  fullWidth?: boolean,
  type?: 'button' | 'submit',
  class?: string,
  mode?: 'main' | 'alt'
}

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);

    this.props.type = this.props.type || 'button';
  }

  protected render(): string {
    return template;
  }
}
