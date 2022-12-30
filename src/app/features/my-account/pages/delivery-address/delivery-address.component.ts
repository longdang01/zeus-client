import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeliveryAddressService } from 'src/app/core/services/deliveryAddress.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {
  
  // setup form
  deliveryAddressForm!: FormGroup;
  deliveryAddressId!: any;
  customerId: any = "";
  title: string = ""; 
  state: number = 0;
  deliveryAddresses: any = [];
  isDisabled: boolean = false;

  constructor(
    private deliveryAddressService: DeliveryAddressService,
    public formBuilder: FormBuilder,
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
    this.search();
  }

  // search 
  search = () => {
    if(this.customerId) {
      this.deliveryAddressService.search({customer: this.customerId}).subscribe((res: any) => {
        this.deliveryAddresses = res;
        console.log(res)
        console.log(this.deliveryAddresses)
      });   
    }
  }

  getDeliveryAddress(id: any) {
    this.title = (id) ? "Cập nhật địa chỉ" : "Thêm địa chỉ";
    this.state = (id) ? 1 : 0;
    this.deliveryAddressId = (id) && id;
    this.isDisabled = false;
    if(id) {
      this.deliveryAddressService.getById(id).subscribe(res => {
        if(res['isActive'] == 1) this.isDisabled = true;

        this.deliveryAddressForm.setValue({
          customer: this.customerId,
          deliveryAddressName: res['deliveryAddressName'],
          consigneeName: res['consigneeName'],
          consigneePhone: res['consigneePhone'],
          isActive: res['isActive']
        });
      });
    } 
    
    if(!id) {
      this.deliveryAddressForm = this.formBuilder.group({
        customer: this.customerId,
        deliveryAddressName: [''],
        consigneeName: [''],
        consigneePhone: [''],
        isActive: ['']
      })
    }
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
        // $('#deliveryaddressModal').modal('hide');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateDeliveryAddress() {
    this.deliveryAddressService.update(this.deliveryAddressId, this.deliveryAddressForm.value)
    .subscribe(
      {
        next: (res) => {
          this.deliveryAddresses = this.deliveryAddresses.map((address: any) => {
            address.isActive = 0
            return address;
          } )
          const index = this.deliveryAddresses.findIndex((item: any) => item._id === res._id);
          this.deliveryAddresses[index] = res;

          // $('#deliveryaddressModal').modal('hide');
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  deleteDeliveryAddress(id: any) {
    const confirm = window.confirm('Bạn có chắc chắn xóa không?'); 

    if(confirm) {
      this.deliveryAddressService.delete(id).subscribe((res) => {
        const index = this.deliveryAddresses.findIndex((item: any) => item._id == res._id);
        this.deliveryAddresses.splice(index, 1);
      })
    }
  }

}
