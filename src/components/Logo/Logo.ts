import { Component } from '../../core';
import * as styles from './logo.module.css';

export class Logo extends Component {
  constructor() {
    super({});
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.logoWrapper}">
            <picture class="${styles.logo}">
                <source srcset="/images/logo.webp" type="image/webp" />
                <img src="/images/logo.png" alt="логотип летчат" />
            </picture>
            <span class="${styles.name}">LetChat</span>
        </div>
    `;
  }
}