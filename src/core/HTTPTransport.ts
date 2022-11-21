type Query = {
  [N: string]: unknown,
};

const queryStringify = (data: Query) => {
  if (Object.keys(data).length === 0) {
    return '';
  }

  return `?${Object
    .entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')}`;
};

type Options = {
  method: keyof typeof HTTPTransport.METHOD
  headers?: Record<string, string>,
  data?: Query,
  timeout?: number,
};

type NoMethodOptions = Omit<Options, 'method'>;

export class HTTPTransport {
  public static METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  } as const;

  get(url: string, options: NoMethodOptions = {}) {
    let handledUrl = url;

    if (options.data) {
      handledUrl = url + queryStringify(options.data);
    }

    return this.request(handledUrl, { ...options, method: HTTPTransport.METHOD.GET });
  }

  post(url: string, options: NoMethodOptions = {}) {
    return this.request(url, { ...options, method: HTTPTransport.METHOD.POST });
  }

  put(url: string, options: NoMethodOptions = {}) {
    return this.request(url, { ...options, method: HTTPTransport.METHOD.PUT });
  }

  delete(url: string, options: NoMethodOptions = {}) {
    return this.request(url, { ...options, method: HTTPTransport.METHOD.DELETE });
  }

  request(url: string, options: Options) {
    const { headers, data, method, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.timeout = timeout;

      if (headers) {
        Object.entries(headers).forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      }

      if (method === HTTPTransport.METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }

      xhr.onload = () => resolve(xhr);

      xhr.onabort = () => reject(new Error('Запрос был отменён!'));
      xhr.ontimeout = () => reject(new Error('Слишком долго нет ответа!'));
      xhr.onerror = () => reject(new Error('Произошла ошибка при выполнении запроса!'));
    });
  }
}
