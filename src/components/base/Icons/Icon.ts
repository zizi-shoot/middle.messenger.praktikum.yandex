import { Component } from '../../../core';
import { template } from './Icon.template';
import type { Props } from '../../../types/component';

interface IconProps extends Props {
  type: keyof typeof template,
}

export class Icon extends Component<IconProps> {
  protected render(): string {
    return template[this.props.type];
  }
}
