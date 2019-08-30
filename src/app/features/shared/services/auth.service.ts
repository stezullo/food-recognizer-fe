import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
import { NetworkService } from './network.service';
import * as moment from 'moment';
import Endpoints from '../constants/endpoints';
import User from '../classes/user';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private username: string;
  loggedIn: BehaviorSubject<boolean>;

  constructor(private network: NetworkService) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  login(user: User): Observable<any> {
    return this.network.post(Endpoints.LOGIN, user)
      .pipe(tap(res => this.setSession(res)))
      .pipe(shareReplay());
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresInDays, 'days');

    this.username = authResult.username;
    this.loggedIn.next(true);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    this.loggedIn.next(false);
    this.username = null;
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    this.loggedIn.next(moment().isBefore(this.getExpiration()));
  }

  isLoggedOut() {
    return this.loggedIn.getValue();
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getUser(): string {
    return this.username;
  }
}
