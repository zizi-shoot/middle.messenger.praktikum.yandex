import { Component } from '../core';
import { router } from '../core/Router';
import type { PropsWithRouter } from '../types/router';
import type { Props } from '../types/component';

export const withRouter = (ComponentClass: typeof Component<any>) => {
  type ComponentProps = typeof ComponentClass extends typeof Component<infer T extends Props> ? T : Props;

  return class WithRouter extends ComponentClass {
    constructor(props: ComponentProps & PropsWithRouter) {
      super({ ...props, router });
    }
  };
};
