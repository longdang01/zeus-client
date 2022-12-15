import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initLoader();
  }

  initLoader = () => {
    $(document).ready(() => {
      // $(window).on("load", function () {
        $(".preloader-wapper").addClass("loaded");
        if ($(".preloader-wapper").hasClass("loaded")) {
            $(".preloader-main")
              .delay(1200)
              //1200
              .queue(function (this: any) {
                $(this).remove();
              });
        }
        // });
    })
  
  }

}
