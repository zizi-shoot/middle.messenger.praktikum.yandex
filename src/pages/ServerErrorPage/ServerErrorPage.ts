import { Component } from '../../core';
import { Link } from '../../components/base';
import * as styles from '../errors.module.css';

export class ServerErrorPage extends Component {
  constructor() {
    const returnLink = new Link({ to: '/', label: 'Вернуться на главную', class: styles.returnLink });

    super({ returnLink });
  }

  protected render(): string {
    // language=hbs
    return `
        <main class="${styles.container}">
            <h1 class="${styles.title}">Что-то пошло не так!</h1>
            <p class="${styles.descr}">Мы уже чиним! Попробуйте зайти чуть позже</p>
            {{{returnLink}}}
        </main>
    `;
  }
}
