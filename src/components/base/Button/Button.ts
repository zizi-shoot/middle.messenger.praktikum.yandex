import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './Button.module.css';
import type { Props } from '../../../types/component';

interface ButtonProps extends Props {
  text: string,
  fullWidth?: boolean,
  type?: 'button' | 'submit',
  class?: string,
  mode?: 'main' | 'alt'
}

export class Button extends Component<ButtonProps> {
  protected render(): string {
    const classList = classNames(
      styles.button,
      this.props.mode === 'alt' && styles.buttonAlt,
      this.props.fullWidth && styles.buttonFullWidth,
      this.props.class,
    );
    // language=hbs
    return `
        <button type="${this.props.type || 'button'}" class="${classList}">
            {{{icon}}}
            {{text}}
        </button>
    `;
  }
}
