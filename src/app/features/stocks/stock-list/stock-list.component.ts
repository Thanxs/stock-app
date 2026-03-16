import { Component, OnInit, inject } from '@angular/core';

import { StockService } from '../../../services/stock/stock.service';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { LoaderComponent } from "../../../shared/loader/loader.component";

@Component({
  selector: 'stock-list',
  imports: [StockCardComponent, LoaderComponent],
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
})
export class StockListComponent implements OnInit {
  private stockService = inject(StockService);
  public stocks = this.stockService.stocks;

  ngOnInit(): void {
    this.stockService.connect();
  }
}
