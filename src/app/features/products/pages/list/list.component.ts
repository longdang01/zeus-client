import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {


  colorIndex: number = 0;
  selectedProduct!: any;
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

  // pagination
  page: number = 1;
  count: number = 0;
  pageSize: number = 12;
  pageSizes: any = [12, 24, 36, 48, 60];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router ) {
      // reload when params change
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.search();
  }

  ngAfterViewInit(): void {
    // this.search();
  
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
    this.getParams(this.route.queryParams);
   
    this.productService.search(this.searchForm).subscribe((res: any) => {
      this.products = res.products;
      this.categories = res.categories;
      this.brands = res.brands;
      this.suppliers = res.suppliers;
      this.collections = res.collections;
      console.log(this.products);
      this.selectCategory(null, $('.activeCategory').first().text());
    });   
  }

  changeColor = (index: number, product: any) => {
    this.selectedProduct = product;
    this.colorIndex = index;
  }

  selectCategory = (event: any, name: any) => {
    const btnDropdownCategory = $('#btn-dropdownCategory'); 
    if(name === "") btnDropdownCategory.text("Tất cả sản phẩm");
    else btnDropdownCategory.text(name);
  }

   // handle pagination
   onTableDataChange = (event: any) => {
    this.page = event;
    this.search();
  }
  
  onTableSizeChange = (event: any) => {
    this.pageSize = event.target.value;
    this.page = 1;
    this.search();
  }

}
