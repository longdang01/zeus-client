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
import { NgxPaginationModule } from 'ngx-pagination';
import { PreloaderComponent } from './components/preloader/preloader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    QuickViewComponent,
    HeaderSearchComponent,
    CartDropdownComponent,
    PreloaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    QuickViewComponent,
    HeaderSearchComponent,
    CartDropdownComponent,
    PreloaderComponent
  ],
})
export class CoreModule { }
