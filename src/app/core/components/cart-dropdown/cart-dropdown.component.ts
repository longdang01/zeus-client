import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartDetailService } from '../../services/cartDetail.service';
declare var $:any;
@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css']
})
export class CartDropdownComponent implements OnInit {
  @Input() cart!: any;
  @Input() totalCarts!: any;
  
  constructor(private cartService: CartService,
    private cartDetailService: CartDetailService) { }

  ngOnInit(): void {
  }

  deleteCartDetail = (id: any) => {
    const confirm = window.confirm('Bạn có chắc chắn xóa không?'); 

    if(confirm) {
      this.cartDetailService.delete(id).subscribe((res) => {
        const index = this.cart.cartDetails.findIndex((item: any) => item._id == res._id);
        this.cart.cartDetails.splice(index, 1);

        $('.cart-count').text(this.cart.cartDetails.length);
      })
    }
  }
  
}
