import { Component } from '../../../core';
import * as styles from './modal.module.css';
import type { Props } from '../../../types/component';

interface ModalProps extends Props {
  content: Component,
  handleClose?: () => void,
}

export class Modal extends Component<ModalProps> {
  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.container}">
            {{{closeButton}}}
            {{{content}}}
        </div>
    `;
  }
}
