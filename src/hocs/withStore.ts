import { Component } from '../core';
import { store, Store } from '../core/Store';
import type { Props } from '../types/component';

// eslint-disable-next-line arrow-body-style
const withStore = <P extends Props>(mapStateToProps: (state: any) => any) => {
  return (ComponentClass: typeof Component) => {
    let previousState: any;

    return class WithStore extends ComponentClass {
      constructor(props: P) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.subscribe(Store.EVENT.UPDATED, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
};

export const withUser = withStore((state) => ({ user: state.user }));
