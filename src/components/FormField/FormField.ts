import classNames from 'classnames';
import { Component } from '@core';
import type { FormFieldProps } from '@typings';
import { Input } from '../base';
import styles from './form-field.module.css';
import template from './template.hbs';

export class FormField extends Component<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super({
      ...props,
      mode: props.mode || 'entry',
      direction: props.direction || 'vertical',
    });
  }

  protected init() {
    const { direction, hasError, mode } = this.props;

    this.props.containerClassList = classNames(
      styles.container,
      direction === 'vertical' && styles.containerVertical,
      hasError && styles.containerError,
    );
    this.props.wrapperClassList = classNames(mode === 'entry' ? styles.wrapperEntry : styles.wrapperProfile);

    this.children.input = new Input({
      name: this.props.name,
      placeholder: this.props.placeholder || '',
      type: this.props.type,
      class: styles.input,
      value: this.props.value,
    });

    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
