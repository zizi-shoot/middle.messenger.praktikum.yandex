import { Component } from '../../core';
import { ChatBody, ChatHead, ChatList, ChatSearch } from '../../components/chat';
import { PageHeader } from '../../components';
import { withChatController } from '../../hocs/withController';
import * as styles from './index-page.module.css';
import { PropsWithController } from '../../types/controller';
import { ChatController } from '../../controllers/ChatController';

interface IndexPageBaseProps extends PropsWithController<ChatController> {
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
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="page-container">
            {{{header}}}
            <main class="${styles.container}">
                {{{chatSearch}}}
                {{{chatHead}}}
                {{{chatList}}}
                {{{chatBody}}}
            </main>
        </div>
    `;
  }
}

export const IndexPage = withChatController(IndexPageBase);
