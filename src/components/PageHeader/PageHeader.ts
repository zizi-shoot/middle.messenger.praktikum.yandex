import { Component } from '../../core';
import { template } from './PageHeader.template';
import './page-header.css';

export class PageHeader extends Component {
  protected render(): string {
    return template;
  }
}
