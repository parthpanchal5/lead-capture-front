import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  hide = true;
  @ViewChild('loginAlertMsg') private loginAlertMsg: SwalComponent;

  // Form-data
  loginData = {
    email: '',
    password: ''
  };

  // Alerts
  message = {
    title: '',
    message: '',
    type: ''
  };

  loginBtn = 'Login';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  // Login
  public login() {
    const formData = new FormData();
    console.log('Login Data: ', this.loginData);

    // Validations
    if (this.loginData.email === '') {
      this.alertMessage('Required.', 'Please enter Email', 'error');
      return;
    }

    if (this.loginData.password === '') {
      this.alertMessage('Required.', 'Please enter password', 'error');
      return;
    }

    formData.append('email', this.loginData.email);
    formData.append('password', this.loginData.password);
    this.loginBtn = 'Logging in...';
    this.loginService.login(formData).subscribe((data) => {
      console.log('data: ', data);
      if (data.status) {
        // this.alertMessage('Success.', data.message, 'success');
        localStorage.setItem('Token', data.token);
        localStorage.setItem('UserData', JSON.stringify(data.data));
        this.router.navigate(['/app']);
      } else {
        this.alertMessage('Failed.',  data.message, 'error');
      }
      this.loginBtn = 'Login';
    }, error => {
      console.log('Error: ', error);
      this.loginBtn = 'Login';
    });
  }

  public alertMessage(title, text, type) {
    this.message.title = title;
    this.message.message = text;
    this.message.type = type;
    setTimeout(() => {
      this.loginAlertMsg.show();
    }, 100);
  }
}


