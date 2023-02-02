import { renderDOM } from './DOM';
import type { Component } from './Component/Component';
import type { Pathname, Query } from '../types/router';
import type { PageComponent } from '../types/component';
import { isPlainEqual } from '../utils';

export class Route {
  private component: Component | null = null;

  constructor(
    private pathname: Pathname,
    private readonly PageComponent: PageComponent,
    private readonly query: Query,
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
      this.component = null;
    }
  }

  public match(pathname: Pathname) {
    return isPlainEqual(pathname, this.pathname);
  }

  public render() {
    if (!this.component) {
      this.component = new this.PageComponent();
      renderDOM(this.query, this.component);
    }
  }
}
