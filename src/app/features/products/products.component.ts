import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  currentRoute: string;
  searchForm = {
    category: "",
    subCategory: "",
    keyword: ""
  };

  products: any = [];
  categories: any = [];
  brands: any = [];
  suppliers: any = [];
  collections: any = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router ) {
      this.getParams(this.route.queryParams);

      this.currentRoute = "";
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            // Show progress spinner or progress bar
            // console.log('Route change detected');
        }

        if (event instanceof NavigationEnd) {
            // Hide progress spinner or progress bar
            // not used currentRouter
            this.currentRoute = event.url;          
            // console.log(event);
            
            this.getParams(this.route.queryParams);
            this.search();
        }

        if (event instanceof NavigationError) {
             // Hide progress spinner or progress bar

            // Present error to user
            console.log(event.error);
        }
      });
   }

  ngOnInit(): void {
    this.search();
  }

  getParams(queryParams: any){
    queryParams.subscribe((params:any) => {
      this.searchForm.category = params['category'];
      this.searchForm.subCategory = params['subCategory'];
      this.searchForm.keyword = params['keyword'];
    });
  }
  // search 
  search = () => {
    this.productService.search(this.searchForm).subscribe((res: any) => {
      this.products = res.products;
      this.categories = res.categories;
      this.brands = res.brands;
      this.suppliers = res.suppliers;
      this.collections = res.collections;
      console.log(this.products);
    });   
  }

}
