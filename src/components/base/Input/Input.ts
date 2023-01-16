import classNames from 'classnames';
import { Component } from '@core';
import type { Props } from '@typings/component';
import styles from './input.module.css';
import template from './template.hbs';

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

  protected init() {
    this.props.classList = classNames(
      styles.input,
      this.props.class,
    );
  }

  protected render() {
    return template;
  }
}
