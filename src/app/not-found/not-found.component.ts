import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  constructor(private router: Router, private sessionService: SessionService) {}
  go() {
    if (this.sessionService.isAutehnticated()) {
      this.router.navigate(['/admin/sites']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
