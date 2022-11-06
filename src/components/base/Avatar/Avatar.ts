import { Component } from '../../../core';
import { template } from './Avatar.template';
import './avatar.css';
import { ComponentProps } from '../../../types';

interface AvatarProps extends ComponentProps {
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
