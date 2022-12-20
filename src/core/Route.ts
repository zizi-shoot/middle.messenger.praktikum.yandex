import { renderDOM } from './renderDOM';
import { isEqual } from '../utils/IsEqual';
import type { Component } from './Component';
import type { Pathname } from '../types/Router';
import type { PageComponent } from '../types/Component';

interface Props {
  rootQuery: string,
}

export class Route {
  private component: Component | null = null;

  constructor(
    private pathname: Pathname,
    private readonly PageComponent: PageComponent,
    private readonly props: Props,
  ) {
  }

  public navigate(pathname: Pathname) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this.component) {
      this.component.hide();
    }
  }

  public match(pathname: Pathname) {
    return isEqual(pathname, this.pathname);
  }

  public render() {
    if (!this.component) {
      this.component = new this.PageComponent();
      renderDOM(this.props.rootQuery, this.component);
      return;
    }

    this.component.show();
  }
}
