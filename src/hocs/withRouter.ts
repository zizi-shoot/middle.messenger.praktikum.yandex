import { Component, router } from '../core';
import type { PropsWithRouter } from '../types/Router';
import type { Props } from '../types/Component';

export const withRouter = (TargetComponent: typeof Component<Props>) => {
  type TargetProps = typeof TargetComponent extends typeof Component<infer P extends Props> ? P : Props;

  return class WithRouter extends TargetComponent {
    constructor(props: TargetProps & PropsWithRouter) {
      super({ ...props, router });
    }
  };
};
