import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlugifyPipe } from './pipes/slugify.pipe';



@NgModule({
  declarations: [
    SlugifyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SlugifyPipe
  ],
  providers: [ SlugifyPipe ]
})
export class SharedModule { }
