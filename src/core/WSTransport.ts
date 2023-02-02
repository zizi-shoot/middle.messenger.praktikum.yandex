import { EventBus } from './EventBus';
import { PING_INTERVAL } from '../utils/const';

export class WSTransport extends EventBus {
  static EVENT = {
    CONNECTED: 'connected',
    MESSAGE: 'message',
    ERROR: 'error',
    CLOSE: 'close',
  };

  private readonly wsURL = 'wss://ya-praktikum.tech/ws/chats';

  private socket: WebSocket | null = null;

  private pingInterval?: NodeJS.Timer;

  constructor(private readonly params: string) {
    super();
  }

  private listen(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransport.EVENT.CONNECTED);
    });

    socket.addEventListener('close', () => {
      this.emit(WSTransport.EVENT.CLOSE);
    });

    socket.addEventListener('error', () => {
      this.emit(WSTransport.EVENT.ERROR);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'pong') {
        return;
      }

      this.emit(WSTransport.EVENT.MESSAGE, data);
    });
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, PING_INTERVAL);
  }

  private escapingHTML(data: Record<string, string>) {
    const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#146;',
    } as const;

    return Object.entries(data).reduce((newData: Record<string, string>, [key, value]) => {
      newData[key] = value.replace(/[&<>"']/g, (match) => htmlEscapes[match as keyof typeof htmlEscapes]);

      return newData;
    }, {});
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.wsURL + this.params);
    this.listen(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.socket!.addEventListener('open', () => {
        this.setupPing();
        resolve();
      });
      this.socket!.addEventListener('close', () => reject());
    });
  }

  public send(data: Record<string, string>) {
    if (!this.socket) {
      throw new Error('Socket is not established yet!');
    }

    const escapedData = this.escapingHTML(data);

    this.socket.send(JSON.stringify(escapedData));
  }

  public close() {
    clearInterval(this.pingInterval);

    this.socket?.close();
  }
}
