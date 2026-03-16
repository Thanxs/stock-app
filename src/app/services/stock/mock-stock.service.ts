import { Injectable } from '@angular/core';
import { interval, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockStockService {
  stocks = ['AAPL', 'MSFT', 'TSLA', 'GOOGL'];

  getStream() {
    return interval(2000).pipe(
      map(() => {
        const price = Math.random() * 1000;

        return {
          symbol: this.stocks[Math.floor(Math.random() * 4)],
          price,
          high: price + 20,
          low: price - 20,
        };
      }),
    );
  }
}
