import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryAddressRoutingModule } from './delivery-address-routing.module';
import { DeliveryAddressComponent } from './delivery-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DeliveryAddressComponent
  ],
  imports: [
    CommonModule,
    DeliveryAddressRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DeliveryAddressModule { }
