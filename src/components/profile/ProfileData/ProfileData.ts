import { Component } from '../../../core';
import { ProfileItem } from '../ProfileItem';
import { createChildrenComponents } from '../../../utils';
import { template } from './ProfileData.template';
import type { ComponentProps, ProfileItemProps } from '../../../types';
import './profile-data.css';

interface ProfileDataProps extends ComponentProps {
  items: ProfileItemProps[],
}

export class ProfileData extends Component<ProfileDataProps> {
  protected init() {
    const items = createChildrenComponents(
      this.props.items,
      ProfileItem,
    );

    this.children = { ...items };
  }

  protected render(): string {
    const items = this.props.items.map(({ id }) => id);

    return template(items);
  }
}
