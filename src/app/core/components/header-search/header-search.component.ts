import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
declare var $: any;

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {

  keyword: string = "";

  products: any = [];
  stateCount: number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.getProducts();
  }

  onSearchChange() {
    if(this.keyword == "") { 
      this.stateCount = 0;
      $('.psearch-results').addClass('hideItem');
      $('.psearch-results').removeClass('showItem');
    }
    else {
      this.stateCount = 1;
      $('.psearch-results').addClass('showItem');
      $('.psearch-results').removeClass('hideItem');
    }
  }
   //Products
   getProducts() {
    this.productService.get().subscribe((res: any) => {
      this.products = res.products;
    }); 
  }
}
