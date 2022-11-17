import classNames from 'classnames';
import { Component } from '../../../core';
import type { Props } from '../../../types/Component';
import * as styles from './input.module.css';

export interface InputProps extends Props {
  type?: 'text' | 'tel' | 'email' | 'password',
  hasError?: boolean,
  name: string,
  placeholder?: string,
  class?: string,
}

export class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    const classList = classNames(
      styles.input,
      props.hasError && styles.inputError,
      props.class,
    );
    super(
      {
        ...props,
        attributes: {
          id: `input-${props.name}`,
          name: props.name,
          placeholder: props.placeholder || '',
          type: props.type || 'text',
          class: classList,
        },
      },
      'input',
    );
  }

  protected render() {
    return '';
  }
}
