import { Component } from '../../core';
import styles from './profile-item.module.css';
import template from './template.hbs';
import type { ProfileItemProps } from '../../types';

export class ProfileItem extends Component<ProfileItemProps> {
  protected init() {
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
