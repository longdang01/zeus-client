import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuickViewComponent } from './components/quick-view/quick-view.component';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { CartDropdownComponent } from './components/cart-dropdown/cart-dropdown.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    QuickViewComponent,
    HeaderSearchComponent,
    CartDropdownComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    QuickViewComponent,
    HeaderSearchComponent,
    CartDropdownComponent,
  ],
})
export class CoreModule { }
