import classNames from 'classnames';
import { Component } from '../../../core';
import { Button, Icon, Input } from '../../base';
import * as styles from './message-form.module.css';
import { getFormData } from '../../../utils';
import type { MessageData } from '../../../types/forms';
import { withMessageController } from '../../../hocs/withController';
import { PropsWithController } from '../../../types/controller';
import { MessagesController } from '../../../controllers/MessagesController';
import type { Props } from '../../../types/component';

interface MessageFormBaseProps extends PropsWithController<MessagesController>, Props {
  class?: string,
  chatId?: ChatID,
}

export class MessageFormBase extends Component<MessageFormBaseProps> {
  protected init() {
    this.props.onSubmit = this.handleSubmit.bind(this);
    this.children.input = new Input({
      class: styles.input,
      name: 'message',
      placeholder: 'Введите сообщение...',
      autocompleteOff: true,
    });
    this.children.attachIcon = new Icon({ type: 'attach' });
    this.children.sentButton = new Button({
      class: styles.sentBtn,
      type: 'submit',
      text: '',
      icon: new Icon({ type: 'sent' }),
    });
  }

  protected async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const data = getFormData(event.target as HTMLFormElement) as MessageData;

    if (data.message.length > 0 && this.props.chatId) {
      const { controller } = this.props;

      try {
        await controller.sendMessage(this.props.chatId, data.message);

        (this.children.input as Component).setProps({ value: '' });
      } catch (e) {
        alert('Не удалось отправить сообщение!');
      }
    }
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

export const MessageForm = withMessageController(MessageFormBase);
