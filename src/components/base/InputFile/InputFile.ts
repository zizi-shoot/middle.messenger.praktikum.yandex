import { Component } from '../../../core';
import { Button } from '../Button';
import * as styles from './input-file.module.css';
import type { Props } from '../../../types/component';

interface InputFileProps extends Props {
}

export class InputFile extends Component<InputFileProps> {
  protected init() {
    this.children.selectBtn = new Button({ text: 'Выбрать файл', mode: 'alt', class: styles.selectBtn });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="${styles.container}">
            <label class="${styles.label}">
                <span class="${styles.placeholder}">{{placeholder}}</span>
                <input
                        id="input-{{name}}"
                        name="{{name}}"
                        type="file"
                        class="${styles.input}"
                />
                {{{selectBtn}}}
            </label>
        </div>

    `;
  }
}
