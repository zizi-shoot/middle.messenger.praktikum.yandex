import { Component } from '../../core';
import * as styles from '../errors.module.css';

export class NotFoundPage extends Component {
  constructor() {
    super(
      {
        attributes: { class: styles.container },
      },
      'main',
    );
  }

  protected render(): string {
    // language=hbs
    return `
        <h1 class=${styles.title}>404</h1>
        <p class=${styles.descr}>Сожалеем, но такой страницы не существует</p>
        <a href="/" class=${styles.returnLink}>Вернуться на главную</a>
    `;
  }
}
