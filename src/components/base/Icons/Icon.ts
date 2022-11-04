import { Component, Props } from '../../../core';
import { template } from './Icon.template';

interface IconProps<T> extends Props<T> {
  type: keyof typeof template,
}

export class Icon extends Component<IconProps<Component>> {
  protected render(): string {
    return template[this.props.type];
  }
}
