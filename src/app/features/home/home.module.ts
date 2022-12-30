import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewArrivalComponent } from './components/new-arrival/new-arrival.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SalesComponent } from './components/sales/sales.component';
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    CategoriesComponent,
    NewArrivalComponent,
    BestSellerComponent,
    SalesComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
