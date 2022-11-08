import { Component } from '../../../core';
import { MessageList } from '../MessageList';
import { MessageForm } from '../MessageForm';
import { template } from './ChatBody.template';
import { messages } from '../../../data/messages';
import type { ComponentProps } from '../../../types';
import './chat-body.css';

export class ChatBody extends Component<ComponentProps> {
  protected init() {
    if (messages) {
      const messageList = new MessageList({ messageList: messages });
      const messageForm = new MessageForm({ class: 'chat__message-form' });

      this.props.hasMessages = true;
      this.children = {
        messageList,
        messageForm,
      };
    }
  }

  protected render(): string {
    return template;
  }
}
