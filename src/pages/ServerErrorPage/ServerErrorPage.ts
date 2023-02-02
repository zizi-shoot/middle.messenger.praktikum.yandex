import { Component } from '../../core';
import { Link } from '../../components/base';
import styles from '../errors.module.css';
import template from './template.hbs';

export class ServerErrorPage extends Component {
  protected init() {
    this.children.returnLink = new Link({ to: '/', label: 'Вернуться на главную', classList: styles.returnLink });
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
