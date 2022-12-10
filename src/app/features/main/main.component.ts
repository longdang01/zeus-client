import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/core/services/script.service';
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private scriptService: ScriptService ) { 
    
  }

  ngOnInit(): void {
    // this.handleUi();
    // 'jquery',
    // 'bootstrap',
    // 'popper',
    // 'slick',
    // 'jquery-magnific-popup', sau sal
    // 'imagesloaded-pkgd',
    // 'sal',
    // 'isotope-pkgd',
    this.scriptService.load(
      'modernizr',
      'js-cookie',
      'jquery-ui',
      'jquery-countdown',
      'counterup',
      'waypoints',
      'main'
      ).then(data => {
      // console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  ngAfterViewInit(): void {
    
  }

  handleUi = () => {
    $(window).on("scroll", function () {
        // Sticky Class Add
        if ($("body").hasClass("sticky-header")) {
          var stickyPlaceHolder = $("#axil-sticky-placeholder"),
            menu = $(".axil-mainmenu"),
            menuH = menu.outerHeight(),
            topHeaderH = $(".axil-header-top").outerHeight() || 0,
            headerCampaign = $(".header-top-campaign").outerHeight() || 0,
            targrtScroll = topHeaderH + headerCampaign;
          if ($(window).scrollTop() > targrtScroll) {
            menu.addClass("axil-sticky");
            stickyPlaceHolder.height(menuH);
          } else {
            menu.removeClass("axil-sticky");
            stickyPlaceHolder.height(0);
          }
        }
      });
  }

}
