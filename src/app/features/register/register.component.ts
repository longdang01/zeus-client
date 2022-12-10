import { Component, IterableDiffers, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { UserService } from 'src/app/core/services/user.service';

declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   // setup form
  customerForm!: FormGroup;
  userForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) {

    this.customerForm = this.formBuilder.group({
      user: ['', Validators.required],
      role: ['', Validators.required],
      customerName: ['', Validators.required],
      picture: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    })

    this.userForm = this.formBuilder.group({
      username: ['', Validators.required], 
      password: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  createUser() {
    const isPassword = $('#confirmPassword').val();
    const checkPassword = (isPassword == this.userForm.get('password')?.value) ? true : false;
    
    if(!checkPassword) {
      alert("Nhập lại mật khẩu không chính xác !")
      return;
    }

    if(!this.userForm.valid && !this.customerForm.valid) {
      alert("Vui lòng điền đầy đủ thông tin !")
      return;
    }

    this.userService.register(this.userForm.value)
    .subscribe({
      next: (res) => {
        this.customerForm.patchValue({
          user: res['_id']
        })

        this.createCustomer();
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  createCustomer() {
    this.customerService.create(this.customerForm.value)
    .subscribe({
      next: (res) => {
        alert("Tạo tài khoản thành công !")
        this.ngZone.run(() => this.router.navigateByUrl('/login')) .then(() => {
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
