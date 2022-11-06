import { Component } from '../../../core';
import { template } from './ProfileItem.template';
import './profile-item.css';
import { ProfileItemProps } from '../../../types';

export class ProfileItem extends Component<ProfileItemProps> {
  protected render(): string {
    return template;
  }
}
