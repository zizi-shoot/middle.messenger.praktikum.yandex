import { Component } from '../../core';
import { template } from './NotFoundPage.template';
import '../errors.css';

export class NotFoundPage extends Component {
  protected render(): string {
    return template;
  }
}
