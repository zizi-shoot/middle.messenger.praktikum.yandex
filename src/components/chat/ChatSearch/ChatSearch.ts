import { Component } from '../../../core';
import { Icon } from '../../base';
import { template } from './ChatSearch.template';
import './chat-search.css';

export class ChatSearch extends Component {
  protected init() {
    this.children.icon = new Icon({ type: 'search', class: 'chat-search__icon' });
  }

  protected render(): string {
    return template;
  }
}
