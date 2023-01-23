import { withRouter } from '../../../hocs';
import { Component } from '../../../core';
import template from './template.hbs';
import type { PropsWithRouter } from '../../../types/router';
import type { Children, Props } from '../../../types/component';

interface LinkProps extends PropsWithRouter, Props {
  to: string,
  label: string,
  children?: Children,
  classList?: string,
  onClick?: (event: MouseEvent) => void,
  extraClickHandler?: () => void,
}

class BaseLink extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super({
      onClick: (event: MouseEvent) => {
        event.preventDefault();
        this.navigate();
      },
      ...props,
    });
  }

  protected navigate() {
    this.props.router.go(this.props.to);
  }

  protected render() {
    return template;
  }
}

export const Link = withRouter(BaseLink);
