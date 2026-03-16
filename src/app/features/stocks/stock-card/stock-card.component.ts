import { Component, input, signal, computed } from '@angular/core';
import { Stock } from '../../../models/interfaces/stock.interface';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'stock-card',
  imports: [NgClass, DecimalPipe],
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
})
export class StockCardComponent {
  // input() возвращает сигнал — computed теперь отслеживает изменения
  stock = input.required<Stock>();

  enabled = signal(true);

  cardClass = computed(() => {
    if (!this.enabled()) return 'gray';

    const s = this.stock(); // теперь computed видит изменения stock
    if (s.previousPrice && s.price > s.previousPrice) return 'green';
    if (s.previousPrice && s.price < s.previousPrice) return 'red';

    return 'gray';
  });

  toggle(): void {
    this.enabled.update((v) => !v);
  }
}
