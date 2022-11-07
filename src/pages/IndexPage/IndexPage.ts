import { Component } from '../../core';
import { template } from './IndexPage.template';
import { ChatBody, ChatHead, ChatList, ChatSearch } from '../../components/chat';
import './index-page.css';
import { chatListItems } from '../../data/chatListItems';

export class IndexPage extends Component {
  protected init() {
    const chatSearch = new ChatSearch({});
    const chatHead = new ChatHead({
      userName: 'Артур Флек',
      userPic: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
    });
    const chatList = new ChatList({ items: chatListItems });
    const chatBody = new ChatBody({});

    this.children = {
      chatSearch,
      chatHead,
      chatList,
      chatBody,
    };
  }

  protected render(): string {
    return template;
  }
}
