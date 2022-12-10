import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlugifyPipe } from './pipes/slugify.pipe';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    SlugifyPipe,
    FilterPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlugifyPipe,
    FilterPipe,

  ],
  providers: [ SlugifyPipe ]
})
export class SharedModule { }
