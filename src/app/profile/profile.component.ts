import { Component, ViewChild } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { User } from '../interface/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @ViewChild('name') nameElement: any;
  @ViewChild('image') imageElement: any;
  @ViewChild('email') emailElement: any;
  @ViewChild('password') passwordElement: any;
  @ViewChild('password2') password2Element: any;
  response: any = { status: 0, message: '' };
  user: User;
  confirmDelete: boolean = false;
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService
  ) {
    this.user = this.sessionService.getUser();
  }
  logout() {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

  update() {
    //email not valid case
    if (!this.isEmailValid()) {
      this.lanceAlert(400, 'Please enter a valid email');
      this.emailElement.nativeElement.style.border = '2px solid red';

      return;
    }
    //short password case
    if (this.user.password && !this.isPasswordLong()) {
      this.lanceAlert(400, 'Password is too short');
      this.passwordElement.nativeElement.style.border = '2px solid red';
      this.password2Element.nativeElement.style.border = '2px solid red';

      return;
    }
    //password dont match case
    if (this.user.password && !this.passwordMatch()) {
      this.lanceAlert(400, 'Password dont match');
      this.passwordElement.nativeElement.style.border = '2px solid red';
      this.password2Element.nativeElement.style.border = '2px solid red';

      return;
    }

    //update case
    this.userService.updateUser(this.user).subscribe((res: any) => {
      this.lanceAlert(res.status, res.message);
      if (res.status === 200) {
        //updating in local storage
        this.sessionService.setUser(res.user);
        //set updating client event
        this.userService.setUserChanges(res.user);
      }
    });
  }
  formChange() {
    this.resetBorders();
    this.response = { status: 0, message: '' };
  }
  passwordMatch() {
    return this.user.password === this.user.password2;
  }
  isPasswordLong() {
    let password = this.user.password || '';
    return password.length >= 6;
  }
  lanceAlert(status: number, msg: string) {
    this.response = { status: status, message: msg };
    setTimeout(() => {
      this.response = { status: 0, message: '' };
      this.resetBorders();
    }, 5000);
  }
  isEmailValid() {
    return this.emailElement.nativeElement.validity.valid;
  }
  resetBorders() {
    this.imageElement.nativeElement.style.border = 'none';
    this.nameElement.nativeElement.style.border = 'none';
    this.emailElement.nativeElement.style.border = 'none';
    this.passwordElement.nativeElement.style.border = 'none';
    this.password2Element.nativeElement.style.border = 'none';
  }
  deleteAccount() {
    this.userService.delete().subscribe((res: any) => {
      this.lanceAlert(res.status, res.message);
      if (res.status === 200) {
        this.sessionService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
