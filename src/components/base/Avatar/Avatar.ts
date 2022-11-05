import { Component, Props } from '../../../core';
import { template } from './Avatar.template';
import './avatar.scss';

interface AvatarProps extends Props {
  class?: string,
  size?: number,
  src: string,
  altText: string,
}

export class Avatar extends Component<AvatarProps> {
  protected render(): string {
    return template;
  }
}
