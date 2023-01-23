/* eslint-disable max-classes-per-file, import/no-extraneous-dependencies */
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import { expect } from 'chai';
import Handlebars, { TemplateDelegate } from 'handlebars';
import { Component } from './Component';
import type { Props } from '../../types/component';

const eventBusMock = {
  subscribe: sinon.fake(),
  emit: sinon.fake(),
};

const { Component: ComponentMock } = proxyquire('./Component', {
  '../EventBus': {
    EventBus: class {
      subscribe = eventBusMock.subscribe;

      emit = eventBusMock.emit;
    },
  },
}) as { Component: typeof Component };

const getInstance = <P extends Props>(props: P, isMock = false) => {
  const ParentClass = isMock ? ComponentMock : Component;

  class Instance extends ParentClass {
    protected render(): TemplateDelegate | null {
      // language=hbs
      return Handlebars.compile(`
          <span>{{text}}</span>
      `);
    }
  }

  return new Instance(props);
};

describe('Component', () => {
  const startProps = { text: 'Hello, world!' };
  const newProps = { text: 'Hello, guys!' };

  it('should fire "init" event on initialization', () => {
    getInstance(startProps, true);

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should fire "component-did-update" event on props change', () => {
    const instance = getInstance(startProps, true);

    instance.setProps(newProps);

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });

  it('should re-render on props change', () => {
    const instance = getInstance(startProps);

    instance.setProps(newProps);

    expect(instance.getContent().textContent).to.eq(newProps.text);
  });

  it('should return valid HTMLElement on getContent()', () => {
    const instance = getInstance(startProps);

    expect(instance.getContent()).to.be.an.instanceof(global.window.HTMLElement);
  });
});
