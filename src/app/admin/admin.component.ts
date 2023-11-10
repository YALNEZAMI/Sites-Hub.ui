import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';
import { User } from '../interface/User';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService
  ) {
    //subscribe for updating user event
    this.userService.getUserChanges().subscribe((user: any) => {
      this.user = user;
    });
    if (!this.sessionService.isAutehnticated()) {
      this.router.navigate(['/login']);
    } else {
      if (this.sessionService.thereisUser()) {
        this.user = this.sessionService.getUser();
      } else {
        this.userService.getUser().subscribe((user: any) => {
          this.user = user;
          this.sessionService.setUser(user);
        });
      }
    }
  }

  goToProfile() {
    this.router.navigate(['/admin/profile']);
  }
  routeOnApps(): boolean {
    let routeSplited = this.router.url.split('/');
    if (
      routeSplited[routeSplited.length - 1] === 'sites' &&
      routeSplited[routeSplited.length - 2] === 'admin'
    ) {
      return true;
    } else {
      return false;
    }
  }
  routeOnProfile(): boolean {
    let routeSplited = this.router.url.split('/');
    if (
      routeSplited[routeSplited.length - 1] === 'profile' &&
      routeSplited[routeSplited.length - 2] === 'admin'
    ) {
      return true;
    } else {
      return false;
    }
  }
  goToSites() {
    this.router.navigate(['/admin/sites']);
  }
}
