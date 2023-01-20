import classNames from 'classnames';
import { Component } from '../../../core';
import { MessageList } from '../MessageList';
import { MessageForm } from '../MessageForm';
import { withChats, withMessages, withUser } from '../../../hocs/withStore';
import styles from './chat-body.module.css';
import template from './template.hbs';
import type { State } from '../../../types/store';
import type { Props } from '../../../types/component';

interface ChatBodyBaseProps extends State, Props {
  class?: string,
  hasMessages?: boolean,
}

export class ChatBodyBase extends Component<ChatBodyBaseProps> {
  protected init() {
    const {
      user,
      chats,
      class: className,
      hasMessages,
    } = this.props;

    this.children.messageForm = new MessageForm();
    this.children.messageList = new MessageList({
      class: styles.messageList,
      chatId: chats.selectedChatId,
      userId: user.data.id,
    });

    this.props.classList = classNames(
      styles.container,
      className,
      !chats.selectedChatId && styles.containerEmpty,
      !hasMessages && styles.containerEmptyMessages,
    );

    this.props.styles = styles;
  }

  protected componentDidUpdate() {
    const { selectedChatId } = this.props.chats;

    const {
      chats,
      class: className,
      hasMessages,
    } = this.props;

    this.props.classList = classNames(
      styles.container,
      className,
      !chats.selectedChatId && styles.containerEmpty,
      !hasMessages && styles.containerEmptyMessages,
    );

    (this.children.messageList as Component).setProps({ chatId: selectedChatId });
    (this.children.messageForm as Component).setProps({ chatId: selectedChatId });
  }

  protected render() {
    return template;
  }
}

export const ChatBody = withChats(withUser(withMessages(ChatBodyBase)));
