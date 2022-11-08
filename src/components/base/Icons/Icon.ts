import { Component } from '../../../core';
import { template } from './Icon.template';
import type { ComponentProps } from '../../../types';

interface IconProps extends ComponentProps {
  type: keyof typeof template,
  class?: string,
}

export class Icon extends Component<IconProps> {
  protected render(): string {
    return template[this.props.type];
  }
}
