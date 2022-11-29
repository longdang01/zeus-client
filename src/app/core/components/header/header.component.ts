import { Component, OnInit } from '@angular/core';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';
import { CategoryService } from '../../services/category.service';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  categories: any = [];
  subCategories: any = [];

  constructor(private scriptService: ScriptService,
    private categoryService: CategoryService,
    private slugify: SlugifyPipe ) { }

  ngOnInit(): void {
   this.getCategories();
  }

  //Categories
  getCategories() {
    this.categoryService.get().subscribe((res: any) => {
      this.categories = res;
    }); 
  }

  
  
}
