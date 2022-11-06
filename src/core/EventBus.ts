import { EventCallback } from '../types';

export class EventBus {
  private readonly listeners: Record<string, EventCallback[]> = {};

  public subscribe(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public unsubscribe(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`Событие "${event}" не зарегистрировано!`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  public emit<K>(event: string, ...args: K[]): void {
    if (!this.listeners[event]) {
      throw new Error(`Событие "${event}" не зарегистрировано!`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
