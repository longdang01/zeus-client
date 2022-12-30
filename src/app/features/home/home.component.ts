import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as sal from 'sal.js';
import { CategoryService } from 'src/app/core/services/category.service';
import { NewsService } from 'src/app/core/services/news.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ScriptService } from 'src/app/core/services/script.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { SubCategoryService } from 'src/app/core/services/subCategory.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subCategories: any = [];
  slides: any = [];
  productNews: any = [];
  productBestSellers: any = [];
  productSales: any = [];
  newsList: any = [];

  constructor(private scriptService: ScriptService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private newsService: NewsService,
    private subCategoryService: SubCategoryService,
    private slideService: SlideService,
    private router: Router, private route:ActivatedRoute) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // $('#slick-slider').slick('refresh');
  }

  ngOnInit(): void {
    // this.searchCategories();
    this.searchSlide();
    this.searchProductNew();   
    this.searchProductBestSeller();
    this.searchProductSales();
    this.searchNews();

    //handle ui
    // 'sal',
    this.scriptService.load(
      'imagesloaded-pkgd',
      ).then(data => {
      // console.log('script loaded ', data);
    }).catch(error => console.log(error));
    

    // this.initSlide();
    this.magnificPopupActivation();
    this.axilMasonary();
  }

  searchCategories() {
    this.subCategoryService.get().subscribe((res: any) => {
      this.subCategories = res;
    }); 

  }

  searchSlide=  () => {
    this.slideService.get().subscribe((res: any) => {
      this.slides = res;
      // console.log(this.slides)
      // this.initSlideHero();
      // console.log(this.slides)
    }); 
  }

  searchProductNew = () => {
    this.productService.getNew().subscribe((res: any) => {
      this.productNews = res.products;
      // console.log(this.slides)
      // this.initSlideHero();
      // console.log(this.slides)
    }); 
  }
  
  searchProductBestSeller =  () => {
    this.productService.getBestSellers().subscribe((res: any) => {
      this.productBestSellers = res.products;
    }); 
  }

  searchProductSales =  () => {
    this.productService.getSales().subscribe((res: any) => {
      this.productSales = res.products;
    }); 
  }
  
  searchNews =  () => {
    this.newsService.get().subscribe((res: any) => {
      this.newsList = res;
      console.log(res)
    }); 
  }


  initSlide = () => {
    // hero
    // $(".slider-activation-two").slick({
    //   infinite: true,
    //   autoplay: false,
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   dots: true,
    //   fade: true,
    //   adaptiveHeight: true,
    //   cssEase: "linear",
    //   speed: 400,
    // });

    // categories
    // $(".categrie-product-activation-3").slick({
    //   infinite: true,
    //   slidesToShow: 6,
    //   slidesToScroll: 6,
    //   arrows: true,
    //   dots: false,
    //   autoplay: false,
    //   speed: 1000,
    //   prevArrow:
    //     '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
    //   nextArrow:
    //     '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
    //   responsive: [
    //     {
    //       breakpoint: 1199,
    //       settings: {
    //         slidesToShow: 5,
    //         slidesToScroll: 5,
    //       },
    //     },
    //     {
    //       breakpoint: 991,
    //       settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 4,
    //       },
    //     },
    //     {
    //       breakpoint: 767,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //       },
    //     },
    //     {
    //       breakpoint: 479,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2,
    //       },
    //     },
    //     {
    //       breakpoint: 400,
    //       settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ],
    // });

    // best sellers
    // $(".new-arrivals-product-activation-2").slick({
    //   infinite: true,
    //   slidesToShow: 4,
    //   slidesToScroll: 4,
    //   arrows: true,
    //   dots: false,
    //   prevArrow:
    //     '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
    //   nextArrow:
    //     '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
    //   responsive: [
    //     {
    //       breakpoint: 1199,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 3,
    //       },
    //     },
    //     {
    //       breakpoint: 991,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 2,
    //       },
    //     },
    //     {
    //       breakpoint: 576,
    //       settings: {
    //         variableWidth: true,
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //       },
    //     },
    //   ],
    // });
  }

  //video
  magnificPopupActivation = () => {
      var yPopup = $(".popup-youtube");
      if (yPopup.length) {
        yPopup.magnificPopup({
          disableOn: 300,
          type: "iframe",
          mainClass: "mfp-fade",
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false,
        });
      }

      if ($(".zoom-gallery").length) {
        $(".zoom-gallery").each(function (this: any) {
          $(this).magnificPopup({
            delegate: "a.popup-zoom",
            type: "image",
            gallery: {
              enabled: true,
            },
          });
        });
      }
  }

  //click new arrivals
  axilMasonary = function () {
    $(".axil-isotope-wrapper").imagesLoaded(function () {
      // filter items on button click
      $(".isotope-button").on("click", "button", function (this: any) {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({
          filter: filterValue,
        });
      });

      // init Isotope
      var $grid = $(".isotope-list").isotope({
        itemSelector: ".product",
        percentPosition: true,
        transitionDuration: "0.7s",
        layoutMode: "fitRows",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1,
        },
      });
    });

    $(".isotope-button button").on("click", function (this: any, event: any) {
      $(this).siblings(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
      event.preventDefault();
    });
  }

}
