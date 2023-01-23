import { Component } from '../../../core';
import addIcon from './templates/add.hbs';
import addChatIcon from './templates/addChat.hbs';
import attachIcon from './templates/attach.hbs';
import removeIcon from './templates/remove.hbs';
import sentIcon from './templates/sent.hbs';
import searchIcon from './templates/search.hbs';
import type { Props } from '../../../types/component';

const templates = {
  add: addIcon,
  addChat: addChatIcon,
  attach: attachIcon,
  remove: removeIcon,
  sent: sentIcon,
  search: searchIcon,
};

interface IconProps extends Props {
  type: keyof typeof templates,
}

export class Icon extends Component<IconProps> {
  protected render() {
    return templates[this.props.type];
  }
}
