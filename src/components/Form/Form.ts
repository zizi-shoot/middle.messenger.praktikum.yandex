import classNames from 'classnames';
import { getFormData } from '../../utils';
import { Component } from '../../core';
import { Button } from '../base';
import { FormField } from '../FormField';
import { formsData } from '../../data/formsData';
import * as styles from './form.module.css';
import type { Props } from '../../types/component';
import type { ValidationResult } from '../../utils/validation/services/validation';

interface FormProps<T> extends Props {
  name: string,
  title?: string,
  submitButtonText: string,
  cancelButtonText?: string,
  validateForm: (data: T) => ValidationResult<T>,
  mode: 'entry' | 'profile',
  sentData: (data: FormData) => void,
  handleCancel?: () => void,
  values?: Record<string, string | number>,
}

export class Form<T> extends Component<FormProps<T>> {
  protected init() {
    this.props.onSubmit = this.handleSubmit.bind(this);
    this.props.onFocusOut = this.handleFocusOut.bind(this);
    this.children.formFields = formsData[this.props.name].map((fieldProps) => {
      const props = fieldProps;

      if (this.props.values) {
        props.value = this.props.values[fieldProps.name];
      }

      return new FormField(props);
    });

    this.children.submitButton = new Button({
      type: 'submit',
      text: this.props.submitButtonText,
      fullWidth: !this.props.cancelButtonText,
    });

    if (this.props.cancelButtonText) {
      this.children.cancelButton = new Button({
        text: this.props.cancelButtonText,
        mode: 'alt',
        onClick: this.props.handleCancel,
      });
    }
  }

  protected toggleErrors(target: EventTarget, errors: ValidationResult<T>['errors'] = {}) {
    if (target instanceof HTMLInputElement) {
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

          field?.setProps({ hasError: target.name in errors, helperText: errors[inputName] });
        }
      }
    }
  }

  protected handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const data = getFormData(event.target as HTMLFormElement) as T;

    const { valid, errors } = this.props.validateForm(data);

    if (valid) {
      this.props.sentData(new FormData(event.target as HTMLFormElement));
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

  protected handleFocusOut(event: FocusEvent) {
    const { currentTarget, target } = event;
    const data = getFormData(currentTarget as HTMLFormElement) as T;
    const { errors } = this.props.validateForm(data as T);

    this.toggleErrors(target!, errors);
  }

  protected render() {
    const classList = classNames(
      styles.form,
      this.props.mode === 'entry' && 'shadow',
      this.props.mode === 'profile' && styles.fixWidth,
    );
    // language=hbs
    return `
        <form class="${classList}" id="{{name}}-form">
            {{#if title}}
                <h3>{{title}}</h3>
            {{/if}}
            {{{formFields}}}
            <div class="${styles.buttonContainer}">
                {{{cancelButton}}}
                {{{submitButton}}}
            </div>
        </form>
    `;
  }
}
