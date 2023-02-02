import { Component } from '../../core';
import { Link } from '../base';
import { Logo } from '../Logo';
import styles from './page-header.module.css';
import template from './template.hbs';

export class PageHeader extends Component {
  protected init() {
    this.children.chatLink = new Link({ to: '/', label: 'Чаты', classList: styles.link });
    this.children.profileLink = new Link({ to: '/profile', label: 'Профиль', classList: styles.link });
    this.children.logoLink = new Link({ to: '/', label: '', children: new Logo() });
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
