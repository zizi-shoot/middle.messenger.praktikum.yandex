import { Component } from '../../core';
import * as styles from '../errors.module.css';

export class ServerErrorPage extends Component {
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
        <h1 class="${styles.title}">Что-то пошло не так!</h1>
        <p class="${styles.descr}">Мы уже чиним! Попробуйте зайти чуть позже</p>
        <a href="/" class="${styles.returnLink}">Вернуться на главную</a>
    `;
  }
}
