import { Injectable } from '@angular/core';
import { User } from '../interface/User';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { env } from '../../env';
import { App } from '../interface/App';
@Injectable({
  providedIn: 'root',
})
export class SiteService {
  user: User;
  constructor(
    private readonly http: HttpClient,
    private readonly sessionService: SessionService
  ) {
    this.user = this.sessionService.getUser();
  }
  add(site: App) {
    //update add date
    site.addDate = new Date();
    return this.http.post(`${env.API_URL}/site`, site);
  }
  delete(site: App) {
    return this.http.delete(`${env.API_URL}/site/${site._id}`);
  }
  update(site: App) {
    return this.http.patch(`${env.API_URL}/site/${site._id}`, site);
  }
}
