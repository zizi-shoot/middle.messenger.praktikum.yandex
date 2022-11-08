import type { Component } from '../core';
import type { ComponentChildren } from '../types';

type Constructable<T = any> = new (...args: any[]) => T;

export const createChildrenComponents = <T extends { id: string }, K extends Component>(
  list: T[],
  constructor: Constructable<K>,
  additionalProps?: Record<string, unknown>,
): ComponentChildren => list.reduce((children: ComponentChildren, props: T) => {
    children[props.id] = new constructor({ ...props, ...additionalProps });

    return children;
  }, {});
