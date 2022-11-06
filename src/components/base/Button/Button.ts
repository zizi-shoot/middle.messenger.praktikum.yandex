import { Component } from '../../../core';
import { template } from './Button.template';
import './button.css';
import { ComponentProps } from '../../../types';

interface ButtonProps extends ComponentProps {
  text: string,
  fullWidth?: boolean,
  type?: 'button' | 'submit',
  class?: string,
  mode?: 'main' | 'alt'
}

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ type: 'button', ...props });
  }

  protected render(): string {
    return template;
  }
}
