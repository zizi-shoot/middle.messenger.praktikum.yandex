import { Component } from '../core';
import { authController } from '../controllers/AuthController';
import { userController } from '../controllers/UserController';
import { chatController } from '../controllers/ChatController';
import { messagesController } from '../controllers/MessagesController';
import type { Props } from '../types/component';
import type { PropsWithController } from '../types/controller';

// eslint-disable-next-line arrow-body-style
const withController = <T>(controller: T) => {
  return (ComponentClass: typeof Component<any>) => {
    type ComponentProps = typeof ComponentClass extends typeof Component<infer K extends Props> ? K : Props;

    return class WithController extends ComponentClass {
      constructor(props: ComponentProps & PropsWithController<T> = {}) {
        super({ ...props, controller });
      }
    };
  };
};

export const withAuthController = withController(authController);
export const withUserController = withController(userController);
export const withChatController = withController(chatController);
export const withMessageController = withController(messagesController);
