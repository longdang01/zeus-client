import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(    
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    const confirm = window.confirm('Bạn chắc chắn muốn đăng xuất không?'); 

    if(confirm) {
      // this.customer = null;
      localStorage.removeItem("id_token");
      localStorage.removeItem("customer");
      this.ngZone.run(() => this.router.navigateByUrl('/home')).then(() => {
      });
    }
  }

  handleUi = () => {
    window.scrollTo(window.scrollX, window.scrollY - 1);
    window.scrollTo(window.scrollX, window.scrollY + 1);
  }

}
