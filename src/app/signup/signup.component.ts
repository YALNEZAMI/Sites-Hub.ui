import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  @ViewChild('name') nameElement: any;
  @ViewChild('email') emailElement: any;
  @ViewChild('password') passwordElement: any;
  @ViewChild('password2') password2Element: any;
  @ViewChild('form') form: any;

  constructor(private userService: UserService) {}
  user: User = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  response: any = { status: 0, message: '' };
  subscribe() {
    //user not filled case
    if (!this.isUserFilled()) {
      this.lanceAlert(400, 'Please fill all the required fields');
      if (!this.user.name) {
        this.nameElement.nativeElement.style.border = '2px solid red';
      }
      if (!this.user.email) {
        this.emailElement.nativeElement.style.border = '2px solid red';
      }

      if (!this.user.password) {
        this.passwordElement.nativeElement.style.border = '2px solid red';
      }
      if (!this.user.password2) {
        this.password2Element.nativeElement.style.border = '2px solid red';
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
      this.password2Element.nativeElement.style.border = '2px solid red';

      return;
    }
    //password dont match case
    if (!this.passwordMatch()) {
      this.lanceAlert(400, 'Password dont match');
      this.passwordElement.nativeElement.style.border = '2px solid red';
      this.password2Element.nativeElement.style.border = '2px solid red';

      return;
    }

    this.userService.signin(this.user).subscribe((res: any) => {
      this.lanceAlert(res.status, res.message);
      if (res.status === 200) {
        this.form.nativeElement.reset();
        this.resetBorders();
      }
    });
  }
  isUserFilled() {
    return (
      this.user.name &&
      this.user.email &&
      this.user.password &&
      this.user.password2
    );
  }
  passwordMatch() {
    return this.user.password === this.user.password2;
  }
  isPasswordLong() {
    return this.user.password.length >= 6;
  }
  lanceAlert(status: number, msg: string) {
    this.response = { status: status, message: msg };
    setTimeout(() => {
      this.response = { status: 0, message: '' };
      this.resetBorders();
    }, 4000);
  }
  isEmailValid() {
    return this.emailElement.nativeElement.validity.valid;
  }
  resetBorders() {
    this.nameElement.nativeElement.style.border = 'none';
    this.emailElement.nativeElement.style.border = 'none';
    this.passwordElement.nativeElement.style.border = 'none';
    this.password2Element.nativeElement.style.border = 'none';
  }
}
