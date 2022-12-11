import classNames from 'classnames';
import { Component } from '../../../core';
import { Icon } from '../../base';
import * as styles from './chat-search.module.css';
import type { Props } from '../../../types/Component';

interface ChatSearchProps extends Props {
  class?: string,
}

export class ChatSearch extends Component<ChatSearchProps> {
  constructor(props: ChatSearchProps) {
    const icon = new Icon({ type: 'search', class: styles.icon });

    super(
      {
        ...props,
        icon,
      },
    );
  }

  protected render(): string {
    const classList = classNames(styles.container, this.props.class);

    // language=hbs
    return `
        <form class="${classList}">
            {{{icon}}}
            <label for="chat-search"></label>
            <input class="${styles.input}" type="text" name="chat-search" id="chat-search" placeholder="Поиск чата">
        </form>
    `;
  }
}
