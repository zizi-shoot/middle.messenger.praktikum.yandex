import { Component } from '../../core';
import { Link } from '../base';
import { Logo } from '../Logo';
import * as styles from './page-header.module.css';

export class PageHeader extends Component {
  constructor() {
    super({});
  }

  protected init() {
    this.children.chatLink = new Link({ to: '/', label: 'Чаты', class: styles.link });
    this.children.profileLink = new Link({ to: '/profile', label: 'Профиль', class: styles.link });
    this.children.signinLink = new Link({ to: '/signin', label: 'Вход', class: styles.link });
    this.children.notLink = new Link({ to: '/404', label: '404', class: styles.link });
    this.children.errorLink = new Link({ to: '/error', label: '500', class: styles.link });
    this.children.logoLink = new Link({ to: '/', label: '', children: new Logo() });
  }

  protected render(): string {
    // language=hbs
    return `
        <header class="${styles.container}">
            {{{logoLink}}}
            <nav>
                <ul class="${styles.navList}">
                    <li>{{{chatLink}}}</li>
                    <li>{{{profileLink}}}</li>
                    <li>{{{signinLink}}}</li>
                    <li>{{{notLink}}}</li>
                    <li>{{{errorLink}}}</li>
                </ul>
            </nav>
        </header>
    `;
  }
}
