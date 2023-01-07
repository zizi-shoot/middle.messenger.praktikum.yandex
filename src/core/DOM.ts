import type { Component } from './Component';

export const renderDOM = <T extends Component>(query: string, component: T) => {
  const root = document.querySelector(query);
  const element = component.getContent();

  if (!root || !element) {
    return null;
  }

  root.innerHTML = '';
  root.appendChild(element);

  component.dispatchComponentDidMount();

  return root;
};

export const renderPortal = <T extends Component>(component: T) => {
  if (document.getElementById('portal')) {
    return null;
  }

  const portalElement = document.createElement('div');
  const contentElement = component.getContent();

  if (!contentElement) {
    return null;
  }

  portalElement.id = 'portal';
  portalElement.append(contentElement);
  component.dispatchComponentDidMount();
  document.body.append(portalElement);

  return {
    portalElement,
  };
};

export const removePortal = () => {
  const portal = document.getElementById('portal');

  if (portal) {
    portal.remove();
  }
};
