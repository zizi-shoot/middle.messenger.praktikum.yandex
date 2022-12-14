import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { isDeepEqual, isObject } from '../utils';
import type { Attributes, Children, Element, Props, PropsAndChildren } from '../types/Component';
import type { EventCallback } from '../types';

export abstract class Component<P extends Props = any> {
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

  protected props: P;

  protected children: Children;

  protected attributes: Attributes;

  constructor(allProps: P, private readonly tagName: string = 'div') {
    const { children, props } = this.getPropsAndChildren(allProps);

    this.children = this.makeProxy(children);
    this.props = this.makeProxy({ ...props, id: this.id });
    this.attributes = this.makeProxy(allProps.attributes || {});
    this.registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENT.INIT);
  }

  private _init() {
    this.element = this.createDocumentElement(this.tagName);
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

  private addAttributes() {
    Object.entries(this.attributes).forEach(([attrName, value]) => {
      this.element.removeAttribute(attrName);
      this.element.setAttribute(attrName, value.toString());
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
    this.element.innerHTML = '';
    this.element.appendChild(fragment);
    this.addEvents();
    this.addAttributes();
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
        throw new Error('?????? ??????????????');
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
      }

      if (key !== 'attributes') {
        props[key as keyof P] = value;
      }
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
      // ???????? ?????????????? ???????????? ????????????, ???? ???????????????? ?????? ?? ???????? template
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

  protected shouldComponentUpdate(prevProps: P, nextProps: P): boolean {
    if (isObject(prevProps) && isObject(nextProps)) {
      return !isDeepEqual(prevProps, nextProps);
    }

    return prevProps !== nextProps;
  }

  protected componentDidUpdate() {
  }

  protected abstract render(): string;

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
    const { attributes = {} } = nextProps;
    const { children = {} } = nextProps;

    if (Object.keys(children).length > 0 && this.children) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length > 0) {
      Object.assign(this.props, props);
    }

    if (Object.values(attributes).length > 0) {
      Object.assign(this.attributes, attributes);
    }

    if (this.requireUpdate) {
      this.eventBus.emit(Component.EVENT.FLOW_CDU, prevProps, { ...this.props, ...this.attributes });
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
