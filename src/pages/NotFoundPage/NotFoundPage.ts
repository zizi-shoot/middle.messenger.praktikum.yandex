import { Component } from '../../core';
import { Link } from '../../components/base';
import * as styles from '../errors.module.css';

export class NotFoundPage extends Component {
  constructor() {
    const returnLink = new Link({ to: '/', label: 'Вернуться на главную', class: styles.returnLink });

    super({ returnLink });
  }

  protected render(): string {
    // language=hbs
    return `
        <main class="${styles.container}">
            <h1 class="${styles.title}">404</h1>
            <p class="${styles.descr}">Сожалеем, но такой страницы не существует</p>
            {{{returnLink}}}
        </main>
    `;
  }
}
