import { Component } from '../../../core';
import styles from './modal.module.css';
import template from './template.hbs';
import type { Props } from '../../../types/component';

interface ModalProps extends Props {
  content: Component,
  handleClose?: () => void,
}

export class Modal extends Component<ModalProps> {
  protected init() {
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
