import { Component, HostListener } from '@angular/core';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private sessionService: SessionService, private router: Router) {}
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any): void {
    let token = '';
    if (this.sessionService.isAutehnticated()) {
      token = localStorage.getItem('token') || '';
      // localStorage.clear();//TODO remove this line while dev
      localStorage.setItem('token', token);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
