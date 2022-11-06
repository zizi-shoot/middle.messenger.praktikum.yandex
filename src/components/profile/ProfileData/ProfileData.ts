import { Children, Component, Props } from '../../../core';
import { template } from './ProfileData.template';
import { ProfileItemProps } from '../../../types';
import { ProfileItem } from '../ProfileItem';
import './profile-data.css';

interface ProfileDataProps extends Props {
  items: ProfileItemProps[],
}

export class ProfileData extends Component<ProfileDataProps> {
  protected init() {
    const items = this.props.items.reduce((children: Children, itemProps) => {
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
