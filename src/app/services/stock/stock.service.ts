import { Injectable, signal, computed, inject } from '@angular/core';
import { Stock } from '../../models/interfaces/stock.interface';
import { WebSocketService } from '../websocket/websocket.service';

@Injectable({ providedIn: 'root' })
export class StockService {
  private stocksMap = signal<Map<string, Stock>>(new Map());
  private ws = inject(WebSocketService);
  public stocks = computed(() => [...this.stocksMap().values()]);

  public connect(): void {
    this.ws.connect().subscribe((stock: Stock) => {
      const prev = this.stocksMap().get(stock.symbol);
      this.stocksMap.update((map) => {
        const newMap = new Map(map);
        newMap.set(stock.symbol, {
          ...stock,
          previousPrice: prev?.price,
        });

        return newMap;
      });
    });
  }
}
