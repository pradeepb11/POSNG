import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchComponent } from './branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';

const routes: Routes = [{
  path: '',
  component: BranchComponent,
  children: [
    {
      path: 'branch-list',
      component: BranchListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchRoutingModule { }

export const routedComponents = [
  BranchComponent,
  BranchListComponent,
];
