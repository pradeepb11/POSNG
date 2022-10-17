import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreAddComponent } from './store-add/store-add.component';
import { StoreEditComponent } from './store-edit/store-edit.component';

const routes: Routes = [{
  path: '',
  component: StoreComponent,
  children: [
    {
      path: 'store-list',
      component: StoreListComponent,
    },
    {
      path: 'store-add',
      component: StoreAddComponent,
    },
    {
      path: 'store-edit/:store_id',
      component: StoreEditComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule { }

export const routedComponents = [
  StoreComponent,
  StoreListComponent,
  StoreAddComponent,
  StoreEditComponent,
];
