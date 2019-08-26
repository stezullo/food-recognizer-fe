import { Injectable } from '@angular/core';
import { tap, shareReplay } from 'rxjs/operators';
import { NetworkService } from './network.service';
import * as moment from 'moment';
import Endpoints from '../constants/endpoints';
import User from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private network: NetworkService) { }

  login(user: User): Observable<any> {
    return this.network.post(Endpoints.LOGIN, user)
      .pipe(tap(res => this.setSession))
      .pipe(shareReplay());
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
