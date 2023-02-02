import sinon from 'sinon';
import { expect } from 'chai';
import { router } from './Router';
import { Component } from '../Component/Component';

const eventBusMock = {
  subscribe: sinon.fake(),
  emit: sinon.fake(),
};

describe('Router', () => {
  const ComponentMock = class {
    getContent = sinon.fake.returns(document.createElement('template'));

    dispatchComponentDidMount = sinon.fake.returns(eventBusMock.emit(Component.EVENT.FLOW_CDM));
  } as unknown as typeof Component;

  beforeEach(() => {
    router.reset();
  });

  it('should return router instance on use()', () => {
    const instance = router.use('/', ComponentMock);

    expect(instance).to.eq(router);
  });

  it('should render a page on start()', () => {
    router
      .use('/', ComponentMock)
      .start();

    expect(eventBusMock.emit.calledWith(Component.EVENT.FLOW_CDM)).to.eq(true);
  });

  it('should redirect to signin on go()', () => {
    const path = '/test';
    const redirectPath = '/signin';

    router
      .use(path, ComponentMock)
      .start();
    router.go(path);

    expect(global.window.location.pathname).to.eq(redirectPath);
  });
});
