import type { Component } from '../core';

export type Children = Record<string, Component | Component[]>;
export type Props = {
  withInternalID?: boolean,
  [N: string]: Component | Component[] | any,
};
export type PropsAndChildren<P> = {
  props: P,
  children: Children,
};

export type PageComponent = typeof Component;
