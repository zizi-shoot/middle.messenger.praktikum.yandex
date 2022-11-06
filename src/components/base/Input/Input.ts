import { Component } from '../../../core';
import { template } from './Input.template';
import './input.css';
import { ComponentProps } from '../../../types';

interface InputProps extends ComponentProps {
  type?: 'text' | 'phone' | 'email',
  name?: string,
  placeholder?: string,
  class?: string,
  halfWidth?: boolean,
  hasError?: boolean,
}

export class Input extends Component<InputProps> {
  protected render(): string {
    return template;
  }
}
