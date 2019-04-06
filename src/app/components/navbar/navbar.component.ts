import { MainComponent } from './../main/main.component';
import { LogoutService } from './../../services/logout.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() profile = {};
    constructor(
      private logoutService: LogoutService,
      private router: Router,
      private mainComponent: MainComponent,
    ) { }

  ngOnInit() {
  }

  getUserData() {
  }
  logout() {
    console.log('logout');
    this.logoutService.logout().subscribe((data) => {
      if (data.status) {
        localStorage.setItem('Token', '');
        this.router.navigate(['/login']);
      } else {
        this.mainComponent.alertMessage({type: 'error', message: 'Logout Failed', title: 'Error'});
      }
    });
  }
}
