import { Component } from '@core';
import type { ProfileItemProps } from '@typings';
import styles from './profile-item.module.css';
import template from './template.hbs';

export class ProfileItem extends Component<ProfileItemProps> {
  protected init() {
    this.props.styles = styles;
  }

  protected render() {
    return template;
  }
}
