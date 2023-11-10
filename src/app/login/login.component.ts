import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/User';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('email') emailElement: any;
  @ViewChild('password') passwordElement: any;
  @ViewChild('form') form: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionService: SessionService
  ) {}
  user: User = {
    email: '',
    password: '',
  };
  response: any = { status: 0, message: '' };
  login() {
    //user not filled case
    if (!this.isUserFilled()) {
      this.lanceAlert(400, 'Please fill all the required fields');

      if (!this.user.email) {
        this.emailElement.nativeElement.style.border = '2px solid red';
      }

      if (!this.user.password) {
        this.passwordElement.nativeElement.style.border = '2px solid red';
      }

      return;
    }

    //email not valid case
    if (!this.isEmailValid()) {
      this.lanceAlert(400, 'Please enter a valid email');
      this.emailElement.nativeElement.style.border = '2px solid red';

      return;
    }
    //short password case
    if (!this.isPasswordLong()) {
      this.lanceAlert(400, 'Password is too short');
      this.passwordElement.nativeElement.style.border = '2px solid red';

      return;
    }

    //make the request
    this.userService.login(this.user).subscribe((res: any) => {
      //if fail lance alert else redirection
      this.lanceAlert(res.status, res.message);
      if (res.status === 200) {
        this.form.nativeElement.reset();
        this.resetBorders();
        this.sessionService.setUser(res.user);
        localStorage.setItem('token', res.user._id);
        this.router.navigate(['/admin/sites']);
      }
    });
  }
  isUserFilled() {
    return this.user.email && this.user.password;
  }

  lanceAlert(status: number, msg: string) {
    this.response = { status: status, message: msg };
    if (status != 200) {
      setTimeout(() => {
        this.response = { status: 0, message: '' };
        this.resetBorders();
      }, 5000);
    }
  }
  isPasswordLong() {
    let password = this.user.password || '';
    return password.length >= 6;
  }
  isEmailValid() {
    return this.emailElement.nativeElement.validity.valid;
  }
  resetBorders() {
    this.emailElement.nativeElement.style.border = 'none';
    this.passwordElement.nativeElement.style.border = 'none';
  }
}
