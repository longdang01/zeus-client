import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {
  customer!: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) 
  {
    const idToken = localStorage.getItem("id_token")
    if(idToken) this.getMe();
  }

  ngOnInit(): void {
  }
  
  getMe() {
    this.userService.getMe()
    .subscribe((res) => {
      this.customer = res.customer;
      console.log(this.customer)
      })
  }
  
  logout() {
    const confirm = window.confirm('Bạn chắc chắn muốn đăng xuất không?'); 

    if(confirm) {
      this.customer = null;
      localStorage.removeItem("id_token");
      localStorage.removeItem("customer");
      this.ngZone.run(() => this.router.navigateByUrl('/home')).then(() => {
      });
    }
  }
}
