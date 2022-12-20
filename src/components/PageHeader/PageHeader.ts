import { Component } from '../../core';
import { Link } from '../base';
import { Logo } from '../Logo';
import * as styles from './page-header.module.css';

export class PageHeader extends Component {
  constructor() {
    const chatLink = new Link({ to: '/', label: 'Чаты', class: styles.link });
    const profileLink = new Link({ to: '/profile', label: 'Профиль', class: styles.link });
    const signinLink = new Link({ to: '/signin', label: 'Вход', class: styles.link });
    const notLink = new Link({ to: '/404', label: '404', class: styles.link });
    const errorLink = new Link({ to: '/error', label: '500', class: styles.link });
    const logoLink = new Link({ to: '/', label: '', children: new Logo() });

    super({
      logoLink,
      chatLink,
      profileLink,
      signinLink,
      notLink,
      errorLink,
    });
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
