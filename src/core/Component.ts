import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { isEqual, isObject } from '../utils';
import type { Children, Element, Props, PropsAndChildren } from '../types/component';
import type { EventCallback } from '../types';

export class Component<P extends Props = any> {
  public static EVENT = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private readonly id = nanoid();

  private readonly eventBus: EventBus = new EventBus();

  private element: Element = document.createElement('template');

  private requireUpdate = false;

  protected props: P = {} as P;

  protected children: Children = {};

  constructor(allProps: P) {
    if (allProps) {
      const { children, props } = this.getPropsAndChildren(allProps);

      this.children = this.makeProxy(children);
      this.props = this.makeProxy({ ...props, id: this.id });
    }

    this.registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENT.INIT);
  }

  private _init() {
    this.init();
    this.element = this.createDocumentElement('template');
    this.eventBus.emit(Component.EVENT.FLOW_RENDER);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Component.EVENT.INIT, this._init.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_RENDER, this._render.bind(this));
  }

  private addEvents() {
    const events = this.getEvents();

    Object.entries(events).forEach(([eventName, callback]) => {
      this.element.addEventListener(eventName, callback);
    });
  }

  private removeEvents() {
    const events = this.getEvents();

    Object.entries(events).forEach(([eventName, callback]) => {
      this.element.removeEventListener(eventName, callback);
    });
  }

  private _componentDidMount() {
    this.componentDidMount();

    if (this.children) {
      Object.values(this.children).forEach((child) => {
        if (Array.isArray(child)) {
          child.forEach((innerChild) => innerChild.dispatchComponentDidMount());

          return;
        }

        child.dispatchComponentDidMount();
      });
    }
  }

  private _render() {
    const fragment = this.compile();

    this.removeEvents();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.element && newElement) {
      this.element.replaceWith(newElement);
    }

    this.element = newElement;
    this.addEvents();
  }

  private _componentDidUpdate(prevProps: P, nextProps: P) {
    const requireRender = this.shouldComponentUpdate(prevProps, nextProps);

    if (!requireRender) {
      return;
    }

    this.componentDidUpdate();
    this.eventBus.emit(Component.EVENT.FLOW_RENDER);
  }

  private makeProxy<T extends object>(item: T): T {
    return new Proxy(item, {
      get: (target, prop: string) => {
        const value = target[prop as keyof T];

        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop: string, value) => {
        if (target[prop as keyof T] !== value) {
          target[prop as keyof T] = value;
          this.requireUpdate = true;
        }

        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as T;
  }

  private createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    if (this.props.withInternalID) {
      element.setAttribute('data-id', this.id);
    }

    return element;
  }

  private getEvents(): Record<string, EventCallback> {
    return Object.entries(this.props).reduce((eventList: Record<string, EventCallback>, [key, value]) => {
      const eventRegexp = /^on(?<event>[A-Z][A-Za-z]+)$/;

      if (eventRegexp.test(key)) {
        const match = key.match(eventRegexp);
        const eventName = match ? match.groups?.event : null;

        if (eventName) {
          eventList[eventName.toLowerCase()] = value as EventCallback;
        }
      }

      return eventList;
    }, {});
  }

  private getPropsAndChildren(allProps: P): PropsAndChildren<P> {
    const props = {} as P;
    const children: PropsAndChildren<P>['children'] = {};

    Object.entries(allProps).forEach(([key, value]) => {
      if (
        (Array.isArray(value) && value.every((item) => item instanceof Component))
        || value instanceof Component
      ) {
        children[key] = value;

        return;
      }

      props[key as keyof P] = value;
    });

    return {
      props,
      children,
    };
  }

  private compile() {
    const propsAndStubs = { ...this.props };
    const { children = {} } = this;
    const childrenLists: Record<string, HTMLTemplateElement> = {};

    Object.entries(children).forEach(([key, child]) => {
      // Если передан массив чилдов, то собираем это в один template
      if (Array.isArray(child)) {
        const childrenFragment = document.createElement('template');

        child.forEach((innerChild) => {
          childrenFragment.appendChild(innerChild.getContent());
        });

        Object.assign(childrenLists, { [key]: childrenFragment });
        Object.assign(propsAndStubs, { [key]: `<div data-id="${this.id}-${key}"></div>` });
      }

      if (child instanceof Component) {
        Object.assign(propsAndStubs, { [key]: `<div data-id="${child.id}"></div>` });
      }
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.entries(children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        const stub = fragment.content.querySelector(`[data-id="${this.id}-${key}"]`);

        if (stub) {
          Array.from(childrenLists[key].children).forEach((childItem) => {
            stub.before(childItem);
          });
          stub.remove();
        }
      }
      if (child instanceof Component) {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);

        if (stub) {
          stub.replaceWith(child.getContent());
        }
      }
    });

    return fragment.content;
  }

  protected componentDidMount() {
  }

  protected init() {
  }

  protected shouldComponentUpdate(prevProps: P, nextProps: P): boolean {
    if (isObject(prevProps) && isObject(nextProps)) {
      return !isEqual(prevProps, nextProps);
    }

    return prevProps !== nextProps;
  }

  protected componentDidUpdate() {
  }

  protected render(): string {
    return '';
  }

  public getContent() {
    return this.element;
  }

  public setProps(nextProps: Partial<P>) {
    if (!nextProps) {
      return;
    }

    this.requireUpdate = false;

    const prevProps = { ...this.props };
    const { props = {} } = this.getPropsAndChildren(nextProps as P);
    const { children = {} } = nextProps;

    if (Object.keys(children).length > 0 && this.children) {
      Object.assign(this.children, children);
    }

    if (Object.keys(props).length > 0) {
      Object.assign(this.props, props);
    }

    if (this.requireUpdate) {
      this.eventBus.emit(Component.EVENT.FLOW_CDU, prevProps, this.props);
      this.requireUpdate = false;
    }
  }

  public dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENT.FLOW_CDM);
    const { children } = this;

    if (children && Object.keys(children).length > 0) {
      this.eventBus.emit(Component.EVENT.FLOW_RENDER);
    }
  }
}
