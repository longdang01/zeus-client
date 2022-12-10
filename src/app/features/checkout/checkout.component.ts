import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { DeliveryAddressService } from 'src/app/core/services/deliveryAddress.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { PaymentService } from 'src/app/core/services/payment.service';
import { TransportService } from 'src/app/core/services/transport.service';
declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  customerId: any = "";
  deliveryAddresses: any = [];
  cartDetails: any = [];
  transports: any = [];
  payments: any = [];
  totalPrice: number = 0;
  selectedTransport!: any;
  selectedPayment!: any;
  postOrders!: any;
  
  // setup form
  deliveryAddressForm!: FormGroup;
  
  constructor(
    private ordersService: OrdersService,
    private deliveryAddressService: DeliveryAddressService,
    private cartService: CartService,
    private transportService: TransportService,
    private paymentService: PaymentService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.customerId = localStorage.getItem("customer");

    this.deliveryAddressForm = this.formBuilder.group({
      customer: this.customerId,
      deliveryAddressName: [''],
      consigneeName: [''],
      consigneePhone: [''],
      isActive: ['']
    })
  }

  ngOnInit(): void {
    this.handleUi();
    this.searchCart();
    this.searchDeliveryAddress();
    this.getTransports();
    this.getPayments();
  }

  // purchase
  purchase = () => {
    if(this.cartDetails.length == 0) {
      alert("Chưa có sản phẩm chọn mua")
      return;
    }

    const customerId = localStorage.getItem("customer");
    const selectedAddress = this.deliveryAddresses.find((item: any) => item.isActive == 1);
   
    this.postOrders = {
      payment: this.selectedPayment._id,
      transport: this.selectedTransport._id,
      customer: customerId,
      deliveryAddress: selectedAddress._id,
      note: $('#notes').val(),
      total: this.totalPrice + this.selectedTransport.fee,
      cartDetails: this.cartDetails
    }

    this.ordersService.create(this.postOrders)
      .subscribe({
        next: (res) => {
          this.searchCart();
          alert("Bạn đã đặt hàng thành công!");
          this.ngZone.run(() => this.router.navigateByUrl('/my-account/orders'))
          // this.refreshTotalCart();
        },
        error: (err) => {
          alert(err.message)
          console.clear();
        }
      });
  }

  // search 
  searchCart = () => {
    if(this.customerId) {
      this.cartService.search({customer: this.customerId}).subscribe((res: any) => {
        this.cartDetails = res.cartDetails.filter((item: any) => item.isActive == 1);
        $('.cart-count').text(res.cartDetails.length);
        // console.log(this.cartDetails);

        this.calcTotalPrice(this.cartDetails);
      });   
    }
  }

  searchDeliveryAddress = () => {
    if(this.customerId) {
      this.deliveryAddressService.search({customer: this.customerId}).subscribe((res: any) => {
        this.deliveryAddresses = res;
      });   
    }
  }

  getTransports() {
    this.transportService.get().subscribe((res: any) => {
      this.transports = res;
      this.selectedTransport = this.transports[0];
    }); 
  }

  selectTransport(transport: any) {
    this.selectedTransport = transport;
  }

  getPayments() {
    this.paymentService.get().subscribe((res: any) => {
      this.payments = res;
      this.selectedPayment = this.payments[0];
    }); 
  }
  
  selectPayment(payment: any) {
    this.selectedPayment = payment;
  }

  createDeliveryAddress() {
    const active = this.deliveryAddressForm.get('isActive')?.value;
    this.deliveryAddressService.create(this.deliveryAddressForm.value)
    .subscribe({
      next: (res) => {
        if(active == 1) {
          this.deliveryAddresses = this.deliveryAddresses.map((address: any) => {
            address.isActive = 0
            return address;
          } )
        }
        
        this.deliveryAddresses.unshift(res);

        this.deliveryAddressForm = this.formBuilder.group({
          customer: this.customerId,
          deliveryAddressName: [''],
          consigneeName: [''],
          consigneePhone: [''],
          isActive: ['']
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateDeliveryAddress(deliveryAddress: any) {
    deliveryAddress.isActive = 1;
    this.deliveryAddressService.update(deliveryAddress._id, deliveryAddress)
    .subscribe(
      {
        next: (res) => {
          this.deliveryAddresses = this.deliveryAddresses.map((address: any) => {
            address.isActive = 0
            return address;
          } )
          const index = this.deliveryAddresses.findIndex((item: any) => item._id === res._id);
          this.deliveryAddresses[index] = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  calcTotalPrice = (cartDetails: any) => {
    this.totalPrice = 0;
    cartDetails.forEach((item: any) => {
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

  handleUi = () => {
    $(".toggle-list > .title").on("click", function (this: any) {
      var target = $(this).parent().children(".shop-submenu");
      var target2 = $(this).parent();
      $(target).slideToggle();
      $(target2).toggleClass("active");
    });
    $(".toggle-btn").on("click", function (this: any) {
      var target = $(this).parent().siblings(".toggle-open");
      var target2 = $(this).parent();
      $(target).slideToggle();
      $(target2).toggleClass("active");
    });
  }
}
