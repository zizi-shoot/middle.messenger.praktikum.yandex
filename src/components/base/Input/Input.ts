import classNames from 'classnames';
import { Component } from '../../../core';
import type { Props } from '../../../types/component';
import * as styles from './input.module.css';

export interface InputProps extends Props {
  type?: 'text' | 'tel' | 'email' | 'password',
  name: string,
  placeholder?: string,
  class?: string,
}

export class Input extends Component<InputProps> {
  protected render() {
    const { props } = this;
    const classList = classNames(
      styles.input,
      props.class,
    );

    // language=hbs
    return `
        <input
                id="input-${props.name}"
                name="${props.name}"
                type="${props.type}"
                class="${classList}"
                placeholder="${props.placeholder}"
        />
    `;
  }
}
