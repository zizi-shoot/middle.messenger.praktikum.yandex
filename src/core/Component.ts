import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { EventBus } from './EventBus';
import { isDeepEqual, isObject } from '../utils';
import { ComponentChildren, ComponentProps } from '../types';

export abstract class Component<P extends ComponentProps = {}> {
  public static EVENT = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private readonly id: string;

  private readonly tagName: string;

  private readonly eventBus: EventBus;

  private element: HTMLElement | SVGElement | null = null;

  private requireUpdate = false;

  protected props: P;

  protected children: ComponentChildren;

  public constructor(propsAndChildren: P, tagName: string = 'div') {
    const props = this.getProps(propsAndChildren);
    const { children } = propsAndChildren;

    this.id = nanoid();
    this.tagName = tagName || 'div';
    this.eventBus = new EventBus();
    this.props = this.makeProxy(props);
    this.children = this.makeProxy(children || {});

    this.registerEvents(this.eventBus);
    this.eventBus.emit(Component.EVENT.INIT);
  }

  private _init() {
    this.element = this.createDocumentElement(this.tagName);

    this.init();
    this.eventBus.emit(Component.EVENT.FLOW_RENDER);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Component.EVENT.INIT, this._init.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Component.EVENT.FLOW_RENDER, this._render.bind(this));
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

  private getProps(propsAndChildren: P): P {
    const props = { ...propsAndChildren };

    delete props.children;

    return props;
  }

  private getPartialProps(propsAndChildren: Partial<P>): Partial<P> {
    const props = { ...propsAndChildren };

    delete props.children;

    return props;
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
      const { element } = this;
      if (element) {
        element.addEventListener(event, callback);
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
    const { children } = this;

    if (children) {
      Object.entries(children).forEach(([key, component]) => {
        Object.assign(propsAndStubs, { [key]: `<div data-id="${component.id}"></div>` });
      });
    }

    const fragment = document.createElement('template');

    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    if (children) {
      Object.values(children).forEach((component) => {
        const stub = fragment.content.querySelector(`[data-id="${component.id}"]`);
        if (!stub) {
          return;
        }

        stub.replaceWith(component.getContent() || '');
      });
    }

    return fragment.content;
  }

  private _componentDidMount() {
    this.componentDidMount();
    const { children } = this;

    if (children) {
      Object.values(children).forEach((child) => child.dispatchComponentDidMount());
    }
  }

  private _componentDidUpdate(prevProps: P, nextProps: P) {
    const requireReRender = !this.componentDidUpdate(prevProps, nextProps);

    if (!requireReRender) {
      return;
    }

    this.eventBus.emit(Component.EVENT.FLOW_RENDER);
  }

  private _render() {
    const fragment = this.compile();

    this.removeEvents();

    const newElement = fragment.firstElementChild;

    if (this.element && (newElement instanceof HTMLElement || newElement instanceof SVGElement)) {
      this.element.replaceWith(newElement);
      this.element = newElement;
      this.addEvents();
    }
  }

  protected init() {

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

  public setProps(nextProps: Partial<P>) {
    if (!nextProps) {
      return;
    }

    this.requireUpdate = false;

    const prevProps = { ...this.props };
    const prevChildren = { ...this.children } as ComponentChildren;
    const props = this.getPartialProps(nextProps);
    const { children } = nextProps;

    if (children && Object.keys(children).length > 0) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length > 0) {
      Object.assign(this.props, props);
    }

    if (this.requireUpdate) {
      this.eventBus.emit(Component.EVENT.FLOW_CDU, { ...prevProps, ...prevChildren }, { ...this.props, ...this.children });
      this.requireUpdate = false;
    }
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
    const { children } = this;

    if (children && Object.keys(children).length > 0) {
      this.eventBus.emit(Component.EVENT.FLOW_RENDER);
    }
  }

  public getContent(): HTMLElement | SVGElement | null {
    return this.element;
  }
}
