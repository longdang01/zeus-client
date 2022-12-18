import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css']
})
export class NewArrivalComponent implements OnInit {
  colorIndex: number = 0;
  selectedProduct!: any;
  @Input() productNews: any = [];

  constructor() { }

  ngOnInit(): void {
  }
  changeColor = (index: number, product: any) => {
    this.selectedProduct = product;
    this.colorIndex = index;
  }
}
