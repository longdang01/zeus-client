import { Component, Input, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  // @Input() categories: any = [];
  @Input() subCategories: any = [];

  constructor() { }

  ngOnInit(): void {
  
    setTimeout(() => {
      this.initSlide();
    }, 1000);
  
  }

  initSlide = () => {
  $(".categrie-product-activation-3").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    dots: false,
    autoplay: false,
    speed: 1000,
    prevArrow:
      '<button class="slide-arrow prev-arrow"><i class="fal fa-long-arrow-left"></i></button>',
    nextArrow:
      '<button class="slide-arrow next-arrow"><i class="fal fa-long-arrow-right"></i></button>',
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  }
}
