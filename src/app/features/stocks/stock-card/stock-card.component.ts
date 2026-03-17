import { Component, input, signal, computed } from '@angular/core';
import { Stock } from '../../../models/interfaces/stock.interface';
import { DecimalPipe, NgClass } from '@angular/common';
import { PriceTrend } from './price-trend.enum';

@Component({
  selector: 'stock-card',
  imports: [NgClass, DecimalPipe],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
})
export class StockCardComponent {
  public readonly stock = input.required<Stock>();
  public readonly enabled = signal(true);
  public readonly cardClass = computed(() => {
    if (!this.enabled()) {
      return PriceTrend.Neutral;
    }

    const stock = this.stock();
    if (stock.previousPrice && stock.price > stock.previousPrice) {
      return PriceTrend.Up;
    }

    if (stock.previousPrice && stock.price < stock.previousPrice) {
      return PriceTrend.Down;
    }

    return PriceTrend.Neutral;
  });

  public toggle(): void {
    this.enabled.update((isEnabled: boolean) => !isEnabled);
  }
}
