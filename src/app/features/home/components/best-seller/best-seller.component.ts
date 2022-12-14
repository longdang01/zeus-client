import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
  colorIndex: number = 0;
  selectedProduct!: any;
  @Input() productBestSellers: any = [];

  constructor() { }

  ngOnInit(): void {
  }
  changeColor = (index: number, product: any) => {
    this.selectedProduct = product;
    this.colorIndex = index;
  }
}
