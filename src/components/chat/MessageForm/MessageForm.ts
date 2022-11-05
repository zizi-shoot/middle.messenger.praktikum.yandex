import { Component, Props } from '../../../core';
import { template } from './MessageForm.template';
import { Button, Icon, Input } from '../../base';
import './message-form.css';

interface MessageFormProps extends Props {
  class?: string,
}

export class MessageForm extends Component<MessageFormProps> {
  constructor(props: MessageFormProps) {
    const input = new Input({
      class: 'message-form__input',
      name: 'message',
      placeholder: 'Введите сообщение...',
    });

    const attachIcon = new Icon({ type: 'attach' });

    const sentButton = new Button({
      class: 'message-form__sent-btn',
      type: 'submit',
      text: '',
      children: {
        icon: new Icon({ type: 'sent' }),
      },
    });

    super({
      ...props,
      children: {
        input,
        attachIcon,
        sentButton,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
