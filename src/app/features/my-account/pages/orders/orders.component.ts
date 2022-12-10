import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders.service';
import { OrdersDetailService } from 'src/app/core/services/ordersDetail.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  ordersList: any = [];
  ordersItem: any = {}; 
  searchOrdersStatus: string = "";

  constructor(
    private ordersService: OrdersService,
    private ordersDetailService: OrdersDetailService,
    
  ) { }

  ngOnInit(): void {
    this.searchOrders();
  }

  //Orders
  searchOrders() {
    const customerId = localStorage.getItem("customer");
    if(customerId) {
      this.ordersService.search({customer: customerId}).subscribe((res: any) => {
        this.ordersList = res;
      });   
    }
  }

  getOrders(id: any) {
    this.ordersService.getById(id).subscribe(res => {
      this.ordersItem = res;
    });
  }

  updateOrders(orders: any, action: any) {

    const confirm = (action == 1) ? window.confirm('Bạn có chắc chắn đặt lại đơn hàng không?')
    : window.confirm('Bạn có chắc chắn hủy đơn hàng không?'); 

    if(confirm) {
      orders.status = (action == 1) ? 0 : 4;
      this.ordersService.update(orders._id, orders)
      .subscribe(
        {
          next: (res) => {
            const index = this.ordersList.findIndex((item: any) => item._id === res._id);
            this.ordersList[index] = res;
          },
          error: (err) => {
            alert(err.message)
            console.clear();
          }
        });
    }
  }

  updateOrdersDetail(ordersDetail: any) {

    ordersDetail.status = Number(ordersDetail.status);

    this.ordersDetailService.update(ordersDetail._id, ordersDetail)
    .subscribe(
      {
        next: (res) => {
          const index = this.ordersItem.ordersDetails.findIndex((item: any) => item._id === res._id);
          this.ordersItem.ordersDetails[index] = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
