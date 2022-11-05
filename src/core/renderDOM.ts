// eslint-disable-next-line import/no-cycle
import { Component } from './Component';

export const renderDOM = <T extends Component>(query: string, component: T) => {
  const root = document.querySelector(query);
  const element = component.getContent();

  if (!root || !element) {
    return null;
  }

  root.appendChild(element);

  component.dispatchComponentDidMount();

  return root;
};
