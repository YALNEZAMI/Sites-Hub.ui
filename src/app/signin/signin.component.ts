import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private userService: UserService) {}
  user: any = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  response: any = { status: 0, message: '' };
  subscribe() {
    this.userService.signin(this.user).subscribe((res: any) => {
      if (res.status == 200) {
        this.response.message = res.message;
      }
      console.log(res);
    });
  }
}
