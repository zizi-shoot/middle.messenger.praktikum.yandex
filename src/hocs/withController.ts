import { Props } from '../types/component';
import { Component } from '../core';
import { PropsWithController } from '../types/controller';
import { authController } from '../controllers/AuthController';

// eslint-disable-next-line arrow-body-style
const withController = <T>(controller: T) => {
  return (ComponentClass: typeof Component<any>) => {
    type ComponentProps = typeof ComponentClass extends typeof Component<infer K extends Props> ? K : Props;

    return class WithController extends ComponentClass {
      constructor(props: ComponentProps & PropsWithController<T>) {
        super({ ...props, controller });
      }
    };
  };
};

export const withAuthController = withController(authController);
