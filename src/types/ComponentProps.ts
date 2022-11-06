import { EventCallback } from './EventCallback';
import { ComponentChildren } from './ComponentChildren';

export type ComponentProps = {
  events?: Record<string, EventCallback>,
  withInternalID?: boolean,
  children?: ComponentChildren
  [N: string]: unknown,
};
