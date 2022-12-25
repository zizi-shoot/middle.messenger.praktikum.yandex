import { Component } from '../../core';
import { ChatBody, ChatHead, ChatList, ChatSearch } from '../../components/chat';
import { PageHeader } from '../../components';
import * as styles from './index-page.module.css';
import { withUser } from '../../hocs/withStore';

export class IndexPageBase extends Component {
  protected init() {
    this.children.chatSearch = new ChatSearch({ class: styles.search });
    this.children.chatHead = new ChatHead({
      userName: 'Артур Флек',
      userPic: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
      class: styles.head,
    });
    this.children.chatList = new ChatList({ class: styles.list });
    this.children.chatBody = new ChatBody({ class: styles.body });
    this.children.header = new PageHeader();
  }

  protected render(): string {
    // language=hbs
    return `
        <div>
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

export const IndexPage = withUser(IndexPageBase);
