import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  colorIndex: number = 0;
  selectedProduct!: any;
  @Input() productSales: any = [];

  constructor() { }

  ngOnInit(): void {
  }
  changeColor = (index: number, product: any) => {
    this.selectedProduct = product;
    this.colorIndex = index;
  }
}
