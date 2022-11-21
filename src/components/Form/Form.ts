import classNames from 'classnames';
import { getFormData } from '../../utils';
import { Component } from '../../core';
import { Button } from '../base';
import { FormField } from '../FormField';
import { formsData } from '../../data/formsData';
import * as styles from './form.module.css';
import type { Props } from '../../types/Component';
import type { ValidationResult } from '../../utils/validation/services/validation';

interface FormProps<T> extends Props {
  name: string,
  buttonSubmitText: string,
  handleValidateForm: (data: T) => ValidationResult<T>;
  mode: 'entry' | 'profile';
}

export class Form<T> extends Component<FormProps<T>> {
  constructor(props: FormProps<T>) {
    const classList = classNames(
      styles.form,
      props.mode === 'entry' && 'shadow',
      props.mode === 'profile' && styles.fixWidth,
    );
    const formFields = formsData[props.name].map((fieldProps) => new FormField(fieldProps));
    const button = new Button({
      type: 'submit',
      text: props.buttonSubmitText,
      fullWidth: true,
    });

    super(
      {
        ...props,
        attributes: {
          id: `${props.name}-form`,
          class: classList,
        },
        formFields,
        button,
      },
      'form',
    );

    this.props.onSubmit = this.handleSubmit.bind(this);
    this.props.onFocusIn = this.handleFocusIn.bind(this);
    this.props.onFocusOut = this.handleFocusOut.bind(this);
  }

  protected toggleErrors(isFocusIn: boolean, target: EventTarget, errors: ValidationResult<T>['errors'] = {}) {
    if (
      target instanceof HTMLInputElement
      && (isFocusIn || target.name in errors)
    ) {
      const inputName = target.name as keyof T;

      if (inputName) {
        const { formFields } = this.children;

        if (Array.isArray(formFields)) {
          const field = formFields.find((fieldComponent) => {
            const element = fieldComponent.getContent().querySelector('input');

            if (element instanceof HTMLInputElement) {
              return element.name === inputName;
            }

            return false;
          });

          const newProps = { hasError: !isFocusIn };

          if (!isFocusIn) {
            Object.assign(newProps, { helperText: errors[inputName] });
          }

          field?.setProps(newProps);
        }
      }
    }
  }

  protected handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const data = getFormData(event.target as HTMLFormElement) as T;

    const { valid, errors } = this.props.handleValidateForm(data);

    if (valid) {
      // eslint-disable-next-line no-console
      console.log(data);
    }

    if (!valid) {
      const { formFields } = this.children;

      if (Array.isArray(formFields)) {
        formFields.forEach((field) => {
          const input = field.getContent().querySelector('input');
          const inputName = input?.name as keyof T;
          if (inputName && inputName in errors) {
            field.setProps({ hasError: true, helperText: errors[inputName] });
          }
        });
      }
    }
  }

  protected handleFocusIn(event: FocusEvent) {
    const { target } = event;

    if (target instanceof HTMLInputElement) {
      this.toggleErrors(true, target);
    }
  }

  protected handleFocusOut(event: FocusEvent) {
    const { currentTarget, target } = event;
    const data = getFormData(currentTarget as HTMLFormElement) as T;
    const { valid, errors } = this.props.handleValidateForm(data as T);

    if (valid) {
      return;
    }

    this.toggleErrors(false, target!, errors);
  }

  protected render() {
    // language=hbs
    return `
        {{{formFields}}}
        {{{button}}}
    `;
  }
}
