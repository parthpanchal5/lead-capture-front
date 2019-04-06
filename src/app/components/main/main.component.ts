import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { TokenService } from 'src/app/token';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('loginAlertMsg') private loginAlertMsg: SwalComponent;

  tempToken = '';
  message = {
    title: '',
    message: '',
    type: ''
  };
  profile = {};
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private token: TokenService) { }
  ngOnInit() {
    this.tempToken = localStorage.getItem('Token');
    console.log(localStorage.getItem('Token'), this.tempToken);
    if (this.tempToken) {
      this.token.setToken(this.tempToken);
      this.getProfile();
    } else {
      this.router.navigate(['/login']);
    }
  }

  public getProfile() {
    // console.log('mail : ', this.token.getToken());
    this.profileService.getProfile().subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        this.profile = data.data;
      } else {
        // this.router.navigate(['/login']);
      }
    }, error => {
      console.log('Error: ', error);
    });
  }

  public alertMessage($event) {
    this.message.title = $event.title;
    this.message.message = $event.message;
    this.message.type = $event.type;
    setTimeout(() => {
      this.loginAlertMsg.show();
    }, 100);
  }

}
