import classNames from 'classnames';
import { Component } from '../../../core';
import * as styles from './Button.module.css';
import type { Props } from '../../../types/Component';

interface ButtonProps extends Props {
  text: string,
  fullWidth?: boolean,
  type?: 'button' | 'submit',
  class?: string,
  mode?: 'main' | 'alt'
}

export class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    const classList = classNames(
      styles.button,
      props.mode === 'alt' && styles.buttonAlt,
      props.fullWidth && styles.buttonFullWidth,
      props.class,
    );

    super(
      {
        ...props,
        attributes: {
          ...props.attributes,
          type: props.type || 'button',
          class: classList,
        },
      },
      'button',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        {{{ icon }}}
        {{text}}
    `;
  }
}
