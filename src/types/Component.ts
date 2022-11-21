import type { Component } from '../core';

export type Attributes = Record<string, Primitive>;
export type Element = HTMLElement | SVGElement;
export type Children = Record<string, Component | Component[]>;
export type Props = {
  withInternalID?: boolean,
  attributes?: Attributes,
  [N: string]: Component | Component[] | any,
};
export type PropsAndChildren<P> = {
  props: P,
  children: Children,
};
