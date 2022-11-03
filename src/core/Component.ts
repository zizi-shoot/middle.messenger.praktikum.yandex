import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { isObject } from '../utils/isObject';
import { isDeepEqual } from '../utils/isDeepEqual';
import { Nullable } from '../types/Nullable';

export type Children<K> = Record<string, K>;
export type Props = {
  [N: string]: unknown,
  events?: Record<string, <T>(...args: T[]) => void>,
  withInternalID?: boolean,
};
type PropsAndChildren<K> = {
  props: Props,
  children: Children<K>,
};
type Event = Record<'INIT' | 'FLOW_CDM' | 'FLOW_CDU' | 'FLOW_RENDER', string>;

export abstract class Component<P extends Props | Children<Component> = {}> {
  public static EVENT: Event = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private readonly id: string;

  private readonly tagName: string;

  private readonly eventBus: EventBus;

  private element: Nullable<HTMLElement> = null;

  private requireUpdate = false;

  protected props: Props;

  protected children: Children<Component>;

  protected constructor(propsAndChildren: P, tagName: string = 'div') {
    const { children, props } = this.getPropsAndChildren(propsAndChildren);

    this.id = nanoid(6);
    this.tagName = tagName || 'div';
    this.eventBus = new EventBus();
    this.children = this.makePropsProxy(children);
    this.props = this.makePropsProxy(props);

    this.registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENT.INIT);
  }

  private init() {
    this.element = this.createDocumentElement(this.tagName);
    this.eventBus.emit(Component.EVENT.FLOW_RENDER);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Component.EVENT.INIT, this.init.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_RENDER, this._render.bind(this));
  }

  private makePropsProxy<T extends Props | Children<Component>>(props: T): T {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];

        return typeof value === 'function' ? value.bind(target) : value;
      },

      set: (target, prop: string, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this.requireUpdate = true;
        }

        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private getPropsAndChildren(propsAndChildren: P): PropsAndChildren<Component> {
    const children: Children<Component> = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
        // } else if (Array.isArray(value) && value.every((item) => item instanceof Component)) {
        //   children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    if (this.props.withInternalID) {
      element.setAttribute('data-id', this.id);
    }

    return element;
  }

  private addEvents() {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, callback]) => {
      if (this.element) {
        this.element.addEventListener(event, callback);
      }
    });
  }

  private removeEvents() {
    const { events } = this.props;

    if (!events || !this.element) {
      return;
    }

    Object.entries(events).forEach(([event, callback]) => {
      if (this.element) {
        this.element.removeEventListener(event, callback);
      }
    });
  }

  private compile(): DocumentFragment {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, component]) => {
      propsAndStubs[key] = `<div data-id="${component.id}"></div>`;
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((component) => {
      const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      const stubChildren = stub.childNodes.length > 0 ? stub.childNodes : [];
      const content = component.getContent();

      stub.replaceWith(content || '');

      const layoutContent = content?.querySelector('[data-layout="1"]');

      if (layoutContent && stubChildren.length) {
        layoutContent.append(...stubChildren);
      }
    });

    return fragment.content;
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(prevProps: P, nextProps: P) {
    const requireReRender = this.componentDidUpdate(prevProps, nextProps);

    if (!requireReRender) {
      return;
    }

    this.eventBus.emit(Component.EVENT.FLOW_RENDER);
  }

  private _render() {
    const fragment = this.compile();

    this.removeEvents();

    const newElement = fragment.firstElementChild;

    if (this.element && newElement instanceof HTMLElement) {
      this.element.replaceWith(newElement);
      this.element = newElement;
      this.addEvents();
    }
  }

  protected setProps(nextProps: P) {
    if (!nextProps) {
      return;
    }

    this.requireUpdate = false;

    const prevProps = { ...this.props };
    const { children, props } = this.getPropsAndChildren(nextProps);

    if (Object.values(children).length > 0) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length > 0) {
      Object.assign(this.props, props);
    }

    if (this.requireUpdate) {
      this.eventBus.emit(Component.EVENT.FLOW_CDU, prevProps, this.props);
      this.requireUpdate = false;
    }
  }

  protected componentDidMount() {
  }

  protected componentDidUpdate(prevProps: P, nextProps: P) {
    if (isObject(prevProps) && isObject(nextProps)) {
      return isDeepEqual(prevProps, nextProps);
    }

    return prevProps === nextProps;
  }

  protected render(): string {
    return '';
  }

  public show() {
    const content = this.getContent();

    if (content) {
      content.style.display = 'block';
    }
  }

  public hide() {
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    }
  }

  public dispatchComponentDidMount() {
    this.eventBus.emit(Component.EVENT.FLOW_CDM);

    if (Object.keys(this.children).length > 0) {
      this.eventBus.emit(Component.EVENT.FLOW_RENDER);
    }
  }

  public getContent(): Nullable<HTMLElement> {
    return this.element;
  }
}
