import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../env';
import { SessionService } from './session.service';
import { User } from '../interface/User';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUpdated: any = new Subject<User>();
  user: User;
  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.user = this.sessionService.getUser();
  }

  signup(user: any) {
    return this.http.post(`${env.API_URL}/user`, user);
  }
  login(user: any) {
    return this.http.post(`${env.API_URL}/user/login`, user);
  }
  getUser() {
    return this.http.get(`${env.API_URL}/user/${this.user._id}`);
  }
  updateUser(user: any) {
    //delet _id field from user object
    // delete user._id;

    return this.http.patch(`${env.API_URL}/user/${this.user._id}`, user);
  }
  delete() {
    return this.http.delete(`${env.API_URL}/user/${this.user._id}`);
  }
  setUserChanges(user: User) {
    this.userUpdated.next(user);
  }
  getUserChanges() {
    return this.userUpdated.asObservable();
  }
}
