import { Component } from '../../core';
import * as styles from '../errors.module.css';

export class NotFoundPage extends Component {
  protected render(): string {
    // language=hbs
    return `
        <main class="${styles.container}">
            <h1 class=${styles.title}>404</h1>
            <p class=${styles.descr}>Сожалеем, но такой страницы не существует</p>
            <a href="/" class=${styles.returnLink}>Вернуться на главную</a>
        </main>
    `;
  }
}
