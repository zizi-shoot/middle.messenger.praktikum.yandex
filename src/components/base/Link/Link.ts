import { Component } from '../../../core';
import { PropsWithRouter } from '../../../types/router';
import { withRouter } from '../../../hocs';
import type { Children } from '../../../types/component';

interface LinkProps extends PropsWithRouter {
  to: string,
  label: string,
  children?: Children,
  class?: string,
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

  protected render(): string {
    // language=hbs
    return `
        <a href="#" class="link ${this.props.class}">
            {{label}}
            {{{children}}}
        </a>
    `;
  }
}

export const Link = withRouter(BaseLink);
