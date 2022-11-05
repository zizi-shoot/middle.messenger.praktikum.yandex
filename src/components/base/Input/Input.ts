import { Component, Props } from '../../../core';
import { template } from './Input.template';
import './_input.scss';

interface InputProps<T> extends Props<T> {
  type?: 'text' | 'phone' | 'email',
  name?: string,
  placeholder?: string,
  class?: string,
  halfWidth?: boolean,
  hasError?: boolean,
}

export class Input extends Component<InputProps<Component>> {
  protected render(): string {
    return template;
  }
}
