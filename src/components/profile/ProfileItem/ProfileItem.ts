import { Component } from '../../../core';
import { template } from './ProfileItem.template';
import type { ProfileItemProps } from '../../../types';
import './profile-item.css';

export class ProfileItem extends Component<ProfileItemProps> {
  protected render(): string {
    return template;
  }
}
