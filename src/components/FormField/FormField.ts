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
  }

  protected init() {
    this.children.input = new Input({
      name: this.props.name,
      placeholder: this.props.placeholder || '',
      type: this.props.type,
      class: styles.input,
      value: this.props.value,
    });
  }

  protected render(): string {
    const { direction, hasError, mode } = this.props;

    const containerClassList = classNames(
      styles.container,
      direction === 'vertical' && styles.containerVertical,
      hasError && styles.containerError,
    );

    const wrapperClassList = classNames(mode === 'entry' ? styles.wrapperEntry : styles.wrapperProfile);

    // language=hbs
    return `
        <div class="${containerClassList}">
            <label for="input-{{name}}" class="${styles.label}">{{label}}</label>
            <div class="${wrapperClassList}">
                {{{input}}}
                {{#if hasError}}
                    <span class="${styles.helperText}">{{helperText}}</span>
                {{/if}}
            </div>
        </div>
    `;
  }
}
