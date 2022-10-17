import { NgModule } from '@angular/core';
import { NbAlertModule, NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { OrderRoutingModule, routedComponents } from './order-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    OrderRoutingModule,
    Ng2SmartTableModule,
    NbAlertModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
})
export class OrderModule { }
