import { Component } from '../../../core';
import { template } from './ProfileData.template';
import { ComponentProps, ProfileItemProps } from '../../../types';
import { ProfileItem } from '../ProfileItem';
import './profile-data.css';
import { createChildrenComponents } from '../../../utils';

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
