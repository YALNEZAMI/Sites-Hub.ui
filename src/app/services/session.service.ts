import { Injectable } from '@angular/core';
import { User } from '../interface/User';
import { App } from '../interface/App';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}
  isAutehnticated(): boolean {
    return localStorage.getItem('token') != null;
  }
  thereisUser(): boolean {
    return localStorage.getItem('user') != null;
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  logout(): void {
    localStorage.clear();
  }
  getSites(): App[] {
    let user = this.getUser();
    return user.apps || [];
  }
  addSite(site: App) {
    let user = this.getUser();
    user.apps?.unshift(site);
    this.setUser(user);
  }
  deleteSite(site: App) {
    let user = this.getUser();
    user.apps = user.apps?.filter((app) => app._id !== site._id);
    this.setUser(user);
  }
  updateSite(site: App) {
    let user = this.getUser();
    user.apps = user.apps?.map((app) => {
      if (app._id === site._id) {
        return site;
      } else {
        return app;
      }
    });
    this.setUser(user);
  }
}
