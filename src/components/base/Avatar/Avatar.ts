import { Component, Props } from '../../../core';
import { template } from './Avatar.template';

interface AvatarProps<T> extends Props<T> {
  class: string,
  size: number,
  src: string,
  altText: string,
}

export class Avatar extends Component<Partial<AvatarProps<Component>>> {
  protected render(): string {
    return template;
  }
}
