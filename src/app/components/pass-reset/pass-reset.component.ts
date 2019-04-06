import { MainComponent } from './../main/main.component';
import { PassResetService } from './../../services/pass-reset.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.css']
})
export class PassResetComponent implements OnInit {

  confirmPass: string;
  formData = {
    oldPass: '',
    newPass: ''
  };

  constructor(
    private mainComponent: MainComponent,
    private passresetService: PassResetService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  passreset() {
    const  formData = new FormData();

    if (!this.formData.oldPass || this.formData.oldPass === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter current password', title: 'Required'});
      return;
    } else {
      formData.append('oldPass', this.formData.oldPass);
    }
    if (!this.formData.newPass || this.formData.newPass === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter new password', title: 'Required'});
      return;
    } else {
      formData.append('newPass', this.formData.newPass);
    }
    if (!this.confirmPass || this.confirmPass === '') {
      this.mainComponent.alertMessage({type: 'error', message: 'Please enter confirm password', title: 'Required'});
    } else if (this.confirmPass !== this.formData.newPass) {
      this.mainComponent.alertMessage({type: 'error', message: 'Password mismatch', title: 'Error'});
    } else {
      this.passresetService.passreset(formData).subscribe((data) => {
        console.log('Pass-reset Data ', data);
        if (data.status) {
          this.mainComponent.alertMessage({type: 'success', message: 'Updated', title: 'Successfully'});
        } else {
          this.mainComponent.alertMessage({type: 'error', message: data.message, title: 'Failed'});
        }
      }, error => {
        console.log('Error: ', error);
      });
    }
  }

}
