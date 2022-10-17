import { NgModule, Component } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbStepperModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { StoreRoutingModule, routedComponents } from './store-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    StoreRoutingModule,
    Ng2SmartTableModule,
    NbStepperModule,
    NbSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [NgForm],
  declarations: [
    ...routedComponents,
  ],
})
export class StoreModule { }
