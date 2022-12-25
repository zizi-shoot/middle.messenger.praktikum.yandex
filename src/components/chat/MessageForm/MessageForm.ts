import classNames from 'classnames';
import { Component } from '../../../core';
import { Button, Icon, Input } from '../../base';
import * as styles from './message-form.module.css';
import type { Props } from '../../../types/component';

interface MessageFormProps extends Props {
  class?: string,
}

export class MessageForm extends Component<MessageFormProps> {
  protected init() {
    this.children.input = new Input({
      class: styles.input,
      name: 'message',
      placeholder: 'Введите сообщение...',
    });
    this.children.attachIcon = new Icon({ type: 'attach' });
    this.children.sentButton = new Button({
      class: styles.sentBtn,
      type: 'submit',
      text: '',
      icon: new Icon({ type: 'sent' }),
    });
  }

  protected render(): string {
    const clasList = classNames(styles.container, this.props.class);

    // language=hbs
    return `
        <form class="${clasList}">
            <label class="${styles.label}" for="message">Введите сообщение</label>
            {{{input}}}
            <button class="${styles.attachBtn}" type="button">
                {{{attachIcon}}}
            </button>
            {{{sentButton}}}
        </form>
    `;
  }
}
