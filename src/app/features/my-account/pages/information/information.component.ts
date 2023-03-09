import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/core/services/customer.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  customer: any = {};
 
  constructor(
    private customerService: CustomerService,
    private userService: UserService,
    public formBuilder: FormBuilder,
  ) { 
    const idToken = localStorage.getItem("id_token")
    if(idToken) this.getMe();
   
  }

  ngOnInit(): void {
  }

  validateEmail = (email: any) => {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  updateCustomerInfo() {
    if(!this.validateEmail(this.customer.email)) {
      alert("email is not valid");
      return;
    }

    this.customerService.update(this.customer._id, this.customer)
    .subscribe(
      {
        next: (res) => {
          // const index = this.deliveryAddresses.findIndex((item: any) => item._id === res._id);
          // this.deliveryAddresses[index] = res;
          if(res.message) {
            alert(res.message);
            return;
          }

          this.customer = res;
          alert("Cập nhật thành công")
          // $('#deliveryaddressModal').modal('hide');
        },
        error: (err) => {
          alert(err);
          console.log(err);
        }
      });
  }

  getMe() {
    this.userService.getMe()
    .subscribe((res) => {
      this.customer = res.customer;
      })
  }
  

}
