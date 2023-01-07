type QueryParams = {
  [N: string]: unknown,
};

const queryStringify = (params: QueryParams) => {
  if (Object.keys(params).length === 0) {
    return '';
  }

  return `?${Object
    .entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')}`;
};

type Options = {
  method: keyof typeof HTTPTransport.METHOD
  headers?: Record<string, string>,
  data?: any,
  timeout?: number,
};

type NoMethodOptions = Omit<Options, 'method'>;

export class HTTPTransport {
  public static API_URL = 'https://ya-praktikum.tech/api/v2';

  public static METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  } as const;

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  private request<Response>(url: string, options: Options): Promise<Response> {
    const { headers, data, method, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.responseType = 'json';

      if (headers) {
        Object.entries(headers).forEach(([header, value]) => {
          xhr.setRequestHeader(header, value);
        });
      } else if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      }

      if (method === HTTPTransport.METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.onabort = () => reject(new Error('Запрос был отменён!'));
      xhr.ontimeout = () => reject(new Error('Слишком долго нет ответа!'));
      xhr.onerror = () => reject(new Error('Произошла ошибка при выполнении запроса!'));
    });
  }

  public get<Response>(url: string, options: NoMethodOptions = {}): Promise<Response> {
    let handledUrl = this.endpoint + url;

    if (options.data) {
      handledUrl += queryStringify(options.data);
    }

    return this.request<Response>(handledUrl, { ...options, method: HTTPTransport.METHOD.GET });
  }

  public post<Response = void>(url: string, options: NoMethodOptions = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: HTTPTransport.METHOD.POST });
  }

  public put<Response = void>(url: string, options: NoMethodOptions = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: HTTPTransport.METHOD.PUT });
  }

  public delete<Response>(url: string, options: NoMethodOptions = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: HTTPTransport.METHOD.DELETE });
  }
}
