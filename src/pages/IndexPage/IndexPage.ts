import { Component, Props } from '../../core';
import { template } from './IndexPage.template';
import {
  ChatBody,
  ChatHead,
  ChatList,
  ChatSearch,
} from '../../components/chat';
import { messages } from '../../data/messages';
import './index-page.css';

export class IndexPage extends Component<Props> {
  constructor(props: Props) {
    const chatSearch = new ChatSearch({});
    const chatHead = new ChatHead({
      userName: 'Артур Флек',
      userPic: 'https://i.pinimg.com/736x/05/21/31/052131c411b8aa376dc38d43cff7f333.jpg',
    });
    const chatList = new ChatList({});
    const chatBody = new ChatBody({ messages });

    super({
      ...props,
      children: {
        chatSearch,
        chatHead,
        chatList,
        chatBody,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
