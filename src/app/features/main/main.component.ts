import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ScriptService } from 'src/app/core/services/script.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private scriptService: ScriptService ) { 
    
  }

  ngOnInit(): void {
    // 'slick',
    // 'jquery',
    this.scriptService.load(
      'modernizr',
      'popper',
      'bootstrap',
      'js-cookie',
      'jquery-ui',
      'jquery-countdown',
      'sal',
      'jquery-magnific-popup',
      'imagesloaded-pkgd',
      'isotope-pkgd',
      'counterup',
      'waypoints',
      'main'
      ).then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  ngAfterViewInit(): void {
    
  }

}
