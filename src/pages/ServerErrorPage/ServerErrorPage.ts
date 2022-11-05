import { Component } from '../../core';
import { template } from './ServerErrorPage.template';
import '../errors.scss';

export class ServerErrorPage extends Component {
  protected render(): string {
    return template;
  }
}
