import { Route } from './Route';
import { Pathname } from '../types/router';
import { PageComponent } from '../types/component';

export class Router {
  private static instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }

    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;

    Router.instance = this;
  }

  private onRoute(pathname: Pathname) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  public use(pathname: Pathname, component: PageComponent) {
    const route = new Route(pathname, component, this.rootQuery);

    this.routes.push(route);

    return this;
  }

  public start() {
    window.onpopstate = (event) => {
      const target = event.currentTarget as Window;

      this.onRoute(target.location.pathname);
    };

    this.onRoute(window.location.pathname);
  }

  public go(pathname: Pathname) {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  public getRoute(pathname: Pathname) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router('#root');
