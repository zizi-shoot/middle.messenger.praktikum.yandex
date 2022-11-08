import { Component } from '../../../core';
import { template } from './Avatar.template';
import type { ComponentProps } from '../../../types';
import './avatar.css';

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
