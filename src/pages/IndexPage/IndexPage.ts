import { Component } from '../../core';
import { ChatController } from '../../controllers/ChatController';
import { PageHeader } from '../../components';
import { withChatController } from '../../hocs/withController';
import { ChatBody, ChatHead, ChatList, ChatSearch } from '../../components/chat';
import styles from './index-page.module.css';
import template from './template.hbs';
import type { PropsWithController } from '../../types/controller';
import type { Props } from '../../types/component';

interface IndexPageBaseProps extends PropsWithController<ChatController>, Props {
}

export class IndexPageBase extends Component<IndexPageBaseProps> {
  protected init() {
    this.children.chatSearch = new ChatSearch({ class: styles.search });
    this.children.chatList = new ChatList({ class: styles.list });
    this.children.chatBody = new ChatBody({ class: styles.body });
    this.children.chatHead = new ChatHead({ class: styles.head });
    this.children.header = new PageHeader();

    // eslint-disable-next-line no-alert
    this.props.controller.fetchChats().catch(() => alert('Не удалось получить список чатов!'));
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}

export const IndexPage = withChatController(IndexPageBase);
