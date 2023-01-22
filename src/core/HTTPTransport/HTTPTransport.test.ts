import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;

  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });

    instance = new HTTPTransport('/chats');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('should send GET request on get()', () => {
    instance.get('/');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });
  it('should send POST request on post()', () => {
    instance.post('/');

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });
  it('should send PUT request on put()', () => {
    instance.put('/users');

    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });
  it('should send DELETE request on delete()', () => {
    instance.delete('/users');

    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });
});
