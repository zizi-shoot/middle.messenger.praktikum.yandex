import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './input.module.css';
import type { Props } from '../../../types/component';

export interface InputProps extends Props {
  type?: 'text' | 'tel' | 'email' | 'password' | 'file',
  name: string,
  placeholder?: string,
  class?: string,
  value?: string | number,
  autocompleteOff?: boolean,
}

export class Input extends Component<InputProps> {
  public setProps(nextProps: Partial<InputProps>) {
    this.props.value = ' ';
    super.setProps(nextProps);
  }

  protected shouldComponentUpdate(prevProps: InputProps, nextProps: InputProps): boolean {
    return super.shouldComponentUpdate(prevProps, nextProps);
  }

  protected render() {
    const { props } = this;
    const classList = classNames(
      styles.input,
      props.class,
    );

    // language=hbs
    return `
        <input
                id="input-{{name}}"
                name="{{name}}"
                type="{{type}}"
                class="${classList}"
                placeholder="{{placeholder}}"
                value="{{value}}"
            {{#if autocompleteOff}}
                autocomplete="off"
            {{/if}}
        />
    `;
  }
}
