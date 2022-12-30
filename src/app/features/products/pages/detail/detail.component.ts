import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartDetailService } from 'src/app/core/services/cartDetail.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ScriptService } from 'src/app/core/services/script.service';
declare var $: any;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  // init detail
  product!: any;
  id!: string;
  colorIndex!: number;


  // init selectedColor, selectedSize
  selectedColor!: any;
  selectedSize!: any;

  // init post data to cart
  postCart!: any;
  
  // refresh total after add to cart
  totalCart!: any;

  
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cartDetailService: CartDetailService,
    private scriptService: ScriptService,
    private route: ActivatedRoute,
    private router: Router ) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    // remove slick after first load in constructor
    this.getProduct();
    this.quantityRanger();
  }

  // get product
  getProduct = () => {
    this.getParams(this.route.queryParams);

    this.productService.getById(this.id).subscribe(res => {
      this.product = res;
      if(!this.product) { alert("Sản phẩm không tồn tại.") }
      else {
  
        this.selectedColor = this.product.colors[(this.colorIndex) ? this.colorIndex : 0];
        this.selectedSize = this.product.colors[(this.colorIndex) ? this.colorIndex : 0].sizes[0];
        //
        // this.quantityRanger();
        this.initSlick();
      }
    })
  }

  // get route params
  getParams(queryParams: any){
    queryParams.subscribe((params:any) => {
      this.id = params['product'];
      this.colorIndex = params['index'];
    });
  }

  // add to cart
  addCart = (product: any) => {
    const customerId = localStorage.getItem("customer");
    const quantity = $('#qty').val();
    
    this.postCart = 
      { 
        customer: customerId,
        product: product._id,
        color: this.selectedColor._id,
        size: this.selectedSize._id,
        quantity: Number(quantity),
        maxQuantity: Number(this.selectedSize.quantity),
    }

    if(customerId) {

      this.cartDetailService.create(this.postCart)
      .subscribe({
        next: (res) => {
          this.refreshTotalCart();
        },
        error: (err) => {
          alert(err.message)
          console.clear();
        }
      });
    } else alert("Đăng nhập để thêm vào giỏ hàng");
  }

  // refresh total items in cart after add to cart 
  refreshTotalCart = () => {
    const customerId = localStorage.getItem("customer");
    this.cartService.search({customer: customerId}).subscribe((res: any) => {
      this.totalCart = res.cartDetails.length;
      $('.cart-count').text(this.totalCart);
    }); 
  }

  // change color
  changeColor = (index: number, item: any) => {
    this.selectedColor = item;

    let found = false;
    this.selectedColor.sizes.forEach((item: any) => {
      if(item.sizeName.toLowerCase() == this.selectedSize.sizeName.toLowerCase()) {
          this.selectedSize = item;
          found = true;
      }
    })

    if(!found) {
      this.selectedSize = this.selectedColor.sizes[0];
    }

    this.destroySlick();
    this.initSlick();
  }

  // change size
  changeSize = (index: number, item: any) => {
    this.selectedSize = item;
  }


  // handle slick, ranger, ...
  destroySlick = () => {
        const gallery = $(".product-large-thumbnail-3");
        const thumbs = $(".product-small-thumb-3");

        gallery.filter('.slick-initialized').slick('unslick'); 
        gallery.find('.slick-list').remove(); 

        thumbs.filter('.slick-initialized').slick('unslick'); 
        thumbs.find('.slick-list').remove(); 

        gallery.addClass('hideSlick');
        thumbs.addClass('hideSlick');
    };

  initSlick = () => {
    $(document).ready(() => {
      const gallery = $(".product-large-thumbnail-3");
      const thumbs = $(".product-small-thumb-3");
      
      thumbs.slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        vertical: true,
        speed: 800,
        draggable: false,
        swipe: false,
        asNavFor: ".product-large-thumbnail-3",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              vertical: false,
            },
          },
        ],
      });

      gallery.slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 800,
        draggable: false,
        swipe: false,
        asNavFor: ".product-small-thumb-3",
      });

      setTimeout(() => {
        gallery.removeClass('hideSlick');
        thumbs.removeClass('hideSlick');
        $(window).resize();
      }, 300);

      $(".zoom-gallery").each(function (this: any) {
        $(this).magnificPopup({
          delegate: "a.popup-zoom",
          type: "image",
          gallery: {
            enabled: true,
          },
        });
      });
    })
  }

  quantityRanger = () => {
    $(document).ready(() => {
      $(".pro-qty").prepend('<span class="dec qtybtn">-</span>');
      $(".pro-qty").append('<span class="inc qtybtn">+</span>');
      $(".qtybtn").on("click", function (this: any) {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.hasClass("inc")) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Don't allow decrementing below zero
          if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 1;
          }
        }
        $button.parent().find("input").val(newVal);
      });
    })
  }


}
