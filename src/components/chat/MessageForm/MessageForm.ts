import classNames from 'classnames';
import { Component } from '@core';
import { MessagesController } from '@controllers/MessagesController';
import { getFormData } from '@utils';
import { withMessageController } from '@hocs/withController';
import { PropsWithController } from '@typings/controller';
import type { MessageData } from '@typings/forms';
import type { Props } from '@typings/component';
import styles from './message-form.module.css';
import template from './template.hbs';
import { Button, Icon, Input } from '../../base';

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

    this.props.classList = classNames(styles.container, this.props.class);
    this.props.styles = styles;
  }

  protected async handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const data = getFormData(event.target as HTMLFormElement) as MessageData;
    const { chatId } = this.props;

    if (data.message.length > 0 && chatId) {
      const { controller } = this.props;

      try {
        await controller.sendMessage(chatId, data.message);

        (this.children.input as Component).setProps({ value: '' });
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Не удалось отправить сообщение!');
      }
    }
  }

  protected render() {
    return template;
  }
}

export const MessageForm = withMessageController(MessageFormBase);
