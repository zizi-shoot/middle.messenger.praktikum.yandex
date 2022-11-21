import { Component } from '../../core';
import * as styles from './page-header.module.css';

export class PageHeader extends Component {
  constructor() {
    super(
      {
        attributes: { class: styles.container },
      },
      'header',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        <a href="/" class="${styles.logoWrapper}">
            <picture class="${styles.logo}">
                <source srcset="/images/logo.webp" type="image/webp" />
                <img src="/images/logo.png" alt="логотип летчат" />
            </picture>
            <span class="${styles.name}">LetChat</span>
        </a>
        <nav>
            <ul class="${styles.navList}">
                <li><a href="/" class="${styles.link}">Чаты</a></li>
                <li><a href="/profile" class="${styles.link}">Профиль</a></li>
                <li><a href="/signin" class="${styles.link}">Вход</a></li>
                <li><a href="/404" class="${styles.link}">404</a></li>
                <li><a href="/error" class="${styles.link}">500</a></li>
            </ul>
        </nav>
    `;
  }
}
