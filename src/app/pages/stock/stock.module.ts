import { NgModule, Component } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule,
  NbStepperModule, NbSelectModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { StockRoutingModule, routedComponents } from './stock-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    StockRoutingModule,
    Ng2SmartTableModule,
    NbStepperModule,
    NbButtonModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NgForm],
  declarations: [
    ...routedComponents,
  ],
})
export class StockModule { }
