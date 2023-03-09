import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InformationComponent
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class InformationModule { }
