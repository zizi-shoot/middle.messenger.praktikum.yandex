import { Component } from '@core';
import styles from './logo.module.css';
import template from './template.hbs';

export class Logo extends Component {
  protected init() {
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
