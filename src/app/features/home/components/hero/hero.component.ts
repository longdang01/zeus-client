import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SlideService } from 'src/app/core/services/slide.service';
declare var $: any;

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  // slides: any = [];
  @Input() slides: any = [];

  constructor(private slideService: SlideService) {

  }

  ngOnInit(): void {
    $('.axil-main-slider-area').addClass('hideItem');
    $('.axil-main-slider-area').removeClass('showItem');

    setTimeout(() => {
      this.initSlide();
      $('.axil-main-slider-area').removeClass('hideItem');
      $('.axil-main-slider-area').addClass('showItem');
    }, 500);

  }
  
  initSlide = () => {
      // hero
      $(".slider-activation-two").slick({
        infinite: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: true,
        adaptiveHeight: true,
        cssEase: "linear",
        speed: 400,
      });
  }
}
