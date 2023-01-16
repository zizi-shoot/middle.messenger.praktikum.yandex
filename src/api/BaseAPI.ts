import { HTTPTransport } from '@core';

export abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(id: number): Promise<unknown>;

  public abstract update?(id: number, data: unknown): Promise<unknown>;

  public abstract delete?(id: number): Promise<unknown>;
}
