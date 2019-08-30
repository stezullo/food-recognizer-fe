import { Component, OnInit } from '@angular/core';
import User from '../../classes/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authErrorMessage: string;
  isLoggedIn: boolean;
  showDropDown: boolean;
  showModal: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = false;
    this.showDropDown = false;
    this.showModal = false;
    this.authService.loggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {
    this.authErrorMessage = "";
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  showErrorInModal(error) {
    this.authErrorMessage = (error.status === 401) ? "Username and/or the password not exists." : error.message;
  }

  handleModalClose(user: User) {
    if (user) {
      this.authErrorMessage = "";

      this.authService.login(user)
        .subscribe(data => {
          this.toggleModal();
        }, error => {
          console.log(error);
          this.showErrorInModal(error);
        });
    }
  }

  getUser(): string {
    return this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}

