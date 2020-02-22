import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDetailPageRoutingModule } from './customer-detail-routing.module';

import { CustomerDetailPage } from './customer-detail.page';
import { NewTripComponent } from '../new-trip/new-trip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CustomerDetailPageRoutingModule
  ],
  declarations: [CustomerDetailPage, NewTripComponent]
})
export class CustomerDetailPageModule {}
