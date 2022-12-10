import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { MyAccountComponent } from './my-account.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyAccountComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MyAccountRoutingModule,
 
    RouterModule,
  ]
})
export class MyAccountModule { }
