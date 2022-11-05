import { Component, Props } from '../../../core';
import { template } from './Icon.template';

interface IconProps extends Props {
  type: keyof typeof template,
  class?: string,
}

export class Icon extends Component<IconProps> {
  protected render(): string {
    return template[this.props.type];
  }
}
