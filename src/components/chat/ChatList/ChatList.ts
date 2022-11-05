import { Children, Component, Props } from '../../../core';
import { chatList } from '../../../data/chatList';
import { ChatItem } from '../ChatItem';
import { template } from './ChatList.template';
import './chat-list.scss';

interface ChatListProps extends Props {
}

export class ChatList extends Component<ChatListProps> {
  constructor(props: ChatListProps) {
    const chatItems = chatList.reduce((children: Children, childProps) => {
      const item = new ChatItem({ ...childProps, withInternalID: true });
      const itemId = childProps.id;

      children[itemId] = item;

      return children;
    }, {});

    super({
      ...props,
      children: {
        ...chatItems,
      },
    });
  }

  protected render(): string {
    return template(chatList.map(({ id }) => id));
  }
}
