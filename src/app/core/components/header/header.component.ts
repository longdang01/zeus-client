import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlugifyPipe } from 'src/app/shared/pipes/slugify.pipe';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { ScriptService } from '../../services/script.service';
import { UserService } from '../../services/user.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  categories: any = [];
  subCategories: any = [];
  // idToken!: any;
  customer!: any;
  searchForm = {
    category: "",
    subCategory: "",
    keyword: ""
  };

  cart!: any;
  totalCarts: number = 0;
  
  constructor(private scriptService: ScriptService,
    private cartService: CartService,
    private userService: UserService,
    private categoryService: CategoryService,
    private slugify: SlugifyPipe,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      this.route.queryParams.subscribe((params:any) => {
        this.searchForm.category = params['category'];
        this.searchForm.subCategory = params['subCategory'];
        this.searchForm.keyword = params['keyword'];
      });

      
      const idToken = localStorage.getItem("id_token")
      if(idToken) this.getMe();
     }

  ngOnInit(): void {
    this.handleGui();
    this.getCategories();
    this.searchCart();
  }
  
  getMe() {
    this.userService.getMe()
     .subscribe((res) => {
        this.customer = res.customer;
      })
  }

  //Categories
  getCategories() {
    this.categoryService.get().subscribe((res: any) => {
      this.categories = res;
    }); 
  }

  selectCategory(event: any, name: any) {
    $('#btn-dropdownCategory').text(name);
  }

  logout() {
    const confirm = window.confirm('Bạn chắc chắn muốn đăng xuất không?'); 

    if(confirm) {
      this.customer = null;
      localStorage.removeItem("id_token");
      localStorage.removeItem("customer");
      this.ngZone.run(() => this.router.navigateByUrl('/home')).then(() => {
      });
    }
  }

  // search 
  searchCart = () => {
    const customerId = localStorage.getItem("customer");
    if(customerId) {
      this.cartService.search({customer: customerId}).subscribe((res: any) => {
        this.cart = res;
        this.totalCarts = res ? res.cartDetails.length : 0;
      });   
    }
  }

  handleGui = () => {
    $(".my-account > a").on("click", function (this: any) {
      $(this).toggleClass("open").siblings().toggleClass("open");
    });
  }

  handleUi = () => {
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }
}
