import { Component } from '../../../core';
import { template } from './Icon.template';
import type { Props } from '../../../types/Component';

interface IconProps extends Props {
  type: keyof typeof template,
}

export class Icon extends Component<IconProps> {
  constructor(props: IconProps) {
    super(props, 'span');
  }

  protected render(): string {
    return template[this.props.type];
  }
}
