import { Component } from '../../core';
import { ChatBody, ChatHead, ChatList, ChatSearch } from '../../components/chat';
import { PageHeader } from '../../components';
import * as styles from './index-page.module.css';

export class IndexPage extends Component {
  constructor() {
    const chatSearch = new ChatSearch({ class: styles.search });
    const chatHead = new ChatHead({
      userName: 'Артур Флек',
      userPic: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
      class: styles.head,
    });
    const chatList = new ChatList({ class: styles.list });
    const chatBody = new ChatBody({ class: styles.body });
    const header = new PageHeader();

    super(
      {
        header,
        chatSearch,
        chatHead,
        chatList,
        chatBody,
      },
    );
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
