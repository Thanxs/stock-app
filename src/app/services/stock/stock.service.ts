import { Injectable, signal, computed, inject } from '@angular/core';
import { Stock } from '../../models/interfaces/stock.interface';
import { WebSocketService } from '../websocket/websocket.service';
import { LoaderService } from '../loader/loader.service';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly stocksMap = signal<Map<string, Stock>>(new Map());
  private readonly ws = inject(WebSocketService);
  private readonly loader = inject(LoaderService);
  public readonly stocks = computed(() => [...this.stocksMap().values()]);

  public connect(): void {
    this.loader.showInitial();

    this.ws.connect().subscribe({
      next: (stock: Stock) => {
        const prev = this.stocksMap().get(stock.symbol);
        this.stocksMap.update((map) => {
          const newMap = new Map(map);
          newMap.set(stock.symbol, {
            ...stock,
            previousPrice: prev?.price,
          });
          return newMap;
        });
        if (this.stocksMap().size > 0) {
          this.loader.hideInitial();
        }
      },
      error: () => this.loader.hideInitial(),
      complete: () => this.loader.hideInitial(),
    });
  }
}
