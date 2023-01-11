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

  private pingInterval: number = 0;

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

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not established yet!');
    }

    this.socket.send(JSON.stringify(data));
  }

  public close() {
    clearInterval(this.pingInterval);

    this.socket?.close();
  }
}
