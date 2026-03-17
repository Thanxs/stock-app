import { Component, OnInit, inject } from '@angular/core';

import { StockService } from '../../../services/stock/stock.service';
import { StockCardComponent } from '../stock-card/stock-card.component';

@Component({
  selector: 'stock-list',
  imports: [StockCardComponent],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  private readonly stockService = inject(StockService);
  public readonly stocks = this.stockService.stocks;

  public ngOnInit(): void {
    this.stockService.connect();
  }
}
