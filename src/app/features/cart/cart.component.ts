import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CartDetailService } from 'src/app/core/services/cartDetail.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: any;
  cartDetail: any = "";
  postUpdate!: any;
  stateUpdate: number = 0;

  //
  totalBuy: number = 0;
  totalPrice: number = 0;

  // init selectedColor, selectedSize
  selectedColor!: any;
  selectedSize!: any;

  constructor(
    private cartService: CartService,
    private cartDetailService: CartDetailService
  ) { }

  ngOnInit(): void {
    this.quantityRanger();
    this.search();
  }

  // search 
  search = () => {
    const customerId = localStorage.getItem("customer");
    if(customerId) {
      this.cartService.search({customer: customerId}).subscribe((res: any) => {
        this.cart = res;
        this.calcTotalItemsBuy(this.cart);
        this.calcTotalPrice(this.cart);
      });   
    }
  }

  // update
  handleOpenUpdate(id: any) {
    this.cartDetailService.getById(id).subscribe((res) => {
      this.cartDetail = res;
      console.log(res)
      this.selectedColor = res.color;
      this.selectedSize = res.size;
      this.stateUpdate = 1;

      $("#updateCartDetailModal").modal("show");
    })
  }

  updateCartDetail = (cartDetail: any) => {
    cartDetail.quantity = (this.stateUpdate === 1) ? Number($('#qty').val()) : cartDetail.quantity;
    cartDetail.color = (this.stateUpdate === 1) ? this.selectedColor : cartDetail.color;
    cartDetail.size = (this.stateUpdate === 1) ? this.selectedSize : cartDetail.size;
    
    this.postUpdate = 
    { 
      cart: this.cart,
      product: cartDetail.product._id,
      color: cartDetail.color._id,
      size:  cartDetail.size._id,
      quantity: cartDetail.quantity,
      maxQuantity: (this.stateUpdate == 1) ? this.selectedSize.quantity : cartDetail.size.quantity,
      isActive: cartDetail.isActive,
    }

    this.cartDetailService.update(cartDetail._id, this.postUpdate).subscribe(
      {
        next: (res) => {
          const index = this.cart.cartDetails.findIndex((item: any) => item._id == res._id);
          this.cart.cartDetails[index] = res;
          this.calcTotalItemsBuy(this.cart);
          this.calcTotalPrice(this.cart);
        },
        error: (err) => {
          alert(err.message)
          console.clear();
        }
      })
  }

  // delete
  deleteCartDetail = (id: any) => {
    const confirm = window.confirm('Bạn có chắc chắn xóa không?'); 

    if(confirm) {
      this.cartDetailService.delete(id).subscribe((res) => {
        const index = this.cart.cartDetails.findIndex((item: any) => item._id == res._id);
        this.cart.cartDetails.splice(index, 1);
        $('.cart-count').text(this.cart.cartDetails.length);
        this.calcTotalItemsBuy(this.cart);
        this.calcTotalPrice(this.cart);
      })
    }
  }

  calcTotalItemsBuy = (cart: any) => {
    this.totalBuy = 0;
    const chooseBuy = (cart) ? cart.cartDetails.filter(
      (item: any) => item.isActive == 1) : [];

    this.totalBuy = chooseBuy.length;  
  }

  calcTotalPrice = (cart: any) => {
      this.totalPrice = 0;
      const chooseBuy = (cart) ? cart.cartDetails.filter((item: any) => item.isActive == 1) : [];
      chooseBuy.forEach((item: any) => {
          if(item.color.sales[0]) {
              if(item.color.sales[0].symbol == 'K') {
                  this.totalPrice+=(item.color.price - item.color.sales[0].value) * Number(item.quantity);
              } else {
                  this.totalPrice+=(item.color.price * ((100 - item.color.sales[0].value)/100)) * Number(item.quantity);
              }
          } else {
              this.totalPrice+=item.color.price * Number(item.quantity);
          }
      })
  }

  // handle update cart detail
  // change color
  changeColor = (index: number, item: any) => {
    this.selectedColor = item;

    let found = false;
    this.selectedColor.sizes.forEach((item: any) => {
      if(item.sizeName.toLowerCase() == this.selectedSize.sizeName.toLowerCase()) {
        this.selectedSize = item;
        found = true;
      }
    })

    if(!found) {
      this.selectedSize = this.selectedColor.sizes[0];
    }
  }

  // change size
  changeSize = (index: number, item: any) => {
    this.selectedSize = item;
  }


  quantityRanger = () => {
    $(document).ready(() => {
      $(".pro-qty").prepend('<span class="dec qtybtn">-</span>');
      $(".pro-qty").append('<span class="inc qtybtn">+</span>');
      $(".qtybtn").on("click", function (this: any) {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.hasClass("inc")) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Don't allow decrementing below zero
          if (oldValue > 1) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 1;
          }
        }
        $button.parent().find("input").val(newVal);
      });
    })
  }
}
