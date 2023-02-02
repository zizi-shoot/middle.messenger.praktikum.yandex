import classNames from 'classnames';
import { Component } from '../../../core';
import styles from './Button.module.css';
import template from './template.hbs';
import type { Props } from '../../../types/component';

interface ButtonProps extends Props {
  text: string,
  fullWidth?: boolean,
  type?: 'button' | 'submit',
  class?: string,
  mode?: 'main' | 'alt'
}

export class Button extends Component<ButtonProps> {
  protected init() {
    const {
      class: className,
      mode,
      type,
      fullWidth,
    } = this.props;

    this.props.classList = classNames(
      styles.button,
      mode === 'alt' && styles.buttonAlt,
      fullWidth && styles.buttonFullWidth,
      className,
    );

    this.props.type = type ?? 'button';
  }

  protected render() {
    return template;
  }
}
