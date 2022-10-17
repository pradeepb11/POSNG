import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaComponent } from './area.component';
import { AreaListComponent } from './area-list/area-list.component';

const routes: Routes = [{
  path: '',
  component: AreaComponent,
  children: [
    {
      path: 'area-list',
      component: AreaListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRoutingModule { }

export const routedComponents = [
  AreaComponent,
  AreaListComponent,
];
