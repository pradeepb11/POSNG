import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockComponent } from './stock.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockAddComponent } from './stock-add/stock-add.component';
import { StockTransferComponent } from './stock-transfer/stock-transfer.component';

const routes: Routes = [{
  path: '',
  component: StockComponent,
  children: [
    {
      path: 'stock-list',
      component: StockListComponent,
    },
    {
      path: 'stock-add',
      component: StockAddComponent,
    },
    {
      path: 'stock-transfer',
      component: StockTransferComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule { }

export const routedComponents = [
  StockComponent,
  StockListComponent,
  StockAddComponent,
  StockTransferComponent,
];
