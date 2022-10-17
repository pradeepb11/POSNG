import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbAccordionModule, NbAlertModule, NbBadgeComponent, NbBadgeModule, NbButtonModule} from '@nebular/theme';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductRoutingModule, routedComponents } from './product-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTreeGridModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbLayoutModule,
    ProductRoutingModule,
    Ng2SmartTableModule,
    NbAccordionModule,
    CommonModule,
    NbAlertModule,
    NbBadgeModule,
  ],
  providers: [NgForm],
  declarations: [
    ...routedComponents,
    FsIconComponent,
  ],
})
export class ProductModule { }
