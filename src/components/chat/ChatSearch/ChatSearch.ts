import { Component, Props } from '../../../core';
import { Icon } from '../../base';
import { template } from './ChatSearch.template';
import './chat-search.scss';

interface ChatSearchProps extends Props {
}

export class ChatSearch extends Component<ChatSearchProps> {
  constructor(props: ChatSearchProps) {
    const icon = new Icon({ type: 'search', class: 'chat-search__icon' });

    super({
      ...props,
      children: {
        icon,
      },
    });
  }

  protected render(): string {
    return template;
  }
}
