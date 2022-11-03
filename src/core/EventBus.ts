type Callback<T extends unknown[] = any[]> = (...args: T) => void;

export class EventBus {
  private readonly listeners: Record<string, Callback[]> = {};

  public subscribe(event: string, callback: Callback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public unsubscribe(event: string, callback: Callback): void {
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
