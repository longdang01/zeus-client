import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // setup form
  userForm!: FormGroup;
  
  constructor(private userService: UserService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,) { 

      this.userForm = this.formBuilder.group({
        username: [''],
        password: ['']
      })
    }

  ngOnInit(): void {
  }

  login() {
    const val = this.userForm.value;
    if (val.username && val.password) {
      this.userService.login(this.userForm.value)
      .subscribe({
        next: (res) => {
          // localStorage.setItem("id_token", JSON.stringify(res.token));
          // this.ngZone.run(() => this.router.navigateByUrl('')) .then(() => {
          
               
          // });
        // console.log(res)

          this.getMe();
          // this.router.navigate([''])
        },
        error: (err) => {
          alert("Thông tin đăng nhập chưa chính xác !");
          console.log(err);
        }
      });
    } else {
      alert("Hãy nhập đầy đủ thông tin để đăng nhập !");
    }
  }

  getMe() {
    this.userService.getMe()
     .subscribe((res) => {
        if(res.customer) {
          localStorage.setItem('customer', res.customer._id);

          this.ngZone.run(() => this.router.navigateByUrl('')) .then(() => {
          
          });
        } else {
          alert("Thông tin đăng nhập chưa chính xác !")
        }
      })
  }
}
