import { Component, Props } from '../../../core';
import { template } from './ChatBody.template';
import { MessageList } from '../MessageList';
import { MessageItemProps } from '../../../types';
import { MessageForm } from '../MessageForm';
import './chat-body.scss';

interface ChatBodyProps extends Props {
  messages: MessageItemProps[],
}

export class ChatBody extends Component<ChatBodyProps> {
  constructor(props: ChatBodyProps) {
    const messageList = new MessageList({ messageList: props.messages });
    const messageForm = new MessageForm({ class: 'chat__message-form' });
    super({
      ...props,
      messages: props.messages,
      children: {
        messageList,
        messageForm,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
