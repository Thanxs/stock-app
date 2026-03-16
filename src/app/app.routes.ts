import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/stocks/stock-list/stock-list.component').then(
        (component) => component.StockListComponent,
      ),
  },
];
