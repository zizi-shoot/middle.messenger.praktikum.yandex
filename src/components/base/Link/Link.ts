import classNames from 'classnames';
import { Component } from '../../../core';
import { PropsWithRouter } from '../../../types/Router';
import { withRouter } from '../../../hocs/withRouter';
import type { Children } from '../../../types';
import * as styles from './link.module.css';

interface LinkProps extends PropsWithRouter {
  to: string,
  label: string,
  children?: Children,
  class?: string,
  onClick?: () => void,
}

class BaseLink extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      onClick: () => this.navigate(),
    });
  }

  protected navigate() {
    this.props.router!.go(this.props.to);
  }

  protected render(): string {
    const classList = classNames(this.props.class, styles.item);

    // language=hbs
    return `
        <a class="${classList}">
            {{ label }}
            {{{children}}}
        </a>
    `;
  }
}

export const Link = withRouter(BaseLink);
