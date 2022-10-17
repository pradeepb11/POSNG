import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddressComponent } from './customer-address/customer-address.component';

const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [
    {
      path: 'customer-list',
      component: CustomerListComponent,
    },
    {
      path: 'customer-address/:customer_id',
      component: CustomerAddressComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }

export const routedComponents = [
  CustomerComponent,
  CustomerListComponent,
  CustomerAddressComponent,
];
