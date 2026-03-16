import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  public connect(): Observable<any> {
    return new Observable((observer) => {
      const ws = new WebSocket('ws://localhost:3000');

      ws.onmessage = (msg) => observer.next(JSON.parse(msg.data));

      ws.onerror = (err) => observer.error(err);

      ws.onclose = () => observer.complete();

      return () => ws.close();
    });
  }
}
