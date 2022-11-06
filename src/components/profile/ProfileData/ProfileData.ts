import { Component } from '../../../core';
import { template } from './ProfileData.template';
import { ComponentChildren, ProfileItemProps, ComponentProps } from '../../../types';
import { ProfileItem } from '../ProfileItem';
import './profile-data.css';

interface ProfileDataProps extends ComponentProps {
  items: ProfileItemProps[],
}

export class ProfileData extends Component<ProfileDataProps> {
  protected init() {
    const items = this.props.items.reduce((children: ComponentChildren, itemProps) => {
      children[itemProps.name] = new ProfileItem({ ...itemProps });

      return children;
    }, {});

    this.children = { ...items };
  }

  protected render(): string {
    const items = this.props.items.map(({ name }) => name);

    return template(items);
  }
}
