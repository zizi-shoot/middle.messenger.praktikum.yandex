import { Component, Props } from '../../../core';
import { template } from './Input.template';
import './input.css';

interface InputProps extends Props {
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
