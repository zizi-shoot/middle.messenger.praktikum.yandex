import classNames from 'classnames';
import { Component } from '../../core';
import { Input } from '../base';
import * as styles from './form-field.module.css';
import type { FormFieldProps } from '../../types';

export class FormField extends Component<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super({
      ...props,
      mode: props.mode || 'entry',
      direction: props.direction || 'vertical',
    });

    this.children.input = new Input({
      name: this.props.name,
      placeholder: this.props.placeholder,
      type: this.props.type,
    });
  }

  protected render(): string {
    const classList = classNames(
      styles.container,
      this.props.direction === 'vertical' && styles.containerVertical,
      this.props.hasError && styles.containerError,
    );

    this.attributes = { class: classList };

    // language=hbs
    return `
        <label for="input-{{name}}" class="${styles.label}">{{label}}</label>
        <div class="${this.props.mode === 'entry' ? styles.wrapperEntry : styles.wrapperProfile}">
            {{{input}}}
            {{#if hasError}}
                <span class="${styles.helperText}">{{helperText}}</span>
            {{/if}}
        </div>
    `;
  }
}
