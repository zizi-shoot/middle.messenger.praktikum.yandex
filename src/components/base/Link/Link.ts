import { Component } from '@core';
import { PropsWithRouter } from '@typings/router';
import { withRouter } from '@hocs';
import type { Children, Props } from '@typings/component';
import template from './template.hbs';

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
