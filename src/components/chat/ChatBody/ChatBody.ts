import { Component } from '../../../core';
import { template } from './ChatBody.template';
import { MessageList } from '../MessageList';
import { MessageItemProps, ComponentProps } from '../../../types';
import { MessageForm } from '../MessageForm';
import './chat-body.css';

interface ChatBodyProps extends ComponentProps {
  messages: MessageItemProps[],
}

export class ChatBody extends Component<ChatBodyProps> {
  protected init() {
    const messageList = new MessageList({ messageList: this.props.messages });
    const messageForm = new MessageForm({ class: 'chat__message-form' });

    this.children = {
      messageList,
      messageForm,
    };
  }

  protected render(): string {
    return template;
  }
}
