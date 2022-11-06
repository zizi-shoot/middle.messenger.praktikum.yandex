import { Children, Component } from '../../../core';
import { chatList } from '../../../data/chatList';
import { ChatItem } from '../ChatItem';
import { template } from './ChatList.template';
import './chat-list.css';

export class ChatList extends Component {
  protected init() {
    const chatItems = chatList.reduce((children: Children, childProps) => {
      children[childProps.id] = new ChatItem({ ...childProps, withInternalID: true });

      return children;
    }, {});

    this.children = {
      ...chatItems,
    };
  }

  protected render(): string {
    return template(chatList.map(({ id }) => id));
  }
}
