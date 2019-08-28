import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import User from '../../classes/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authErrorMessage: string;
  showModal: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authErrorMessage = "";
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  showErrorInModal(error) {
    this.authErrorMessage = (error.status === 401) ? "L'username o la password non esiste." : error.message;
  }

  handleModalClose(user: User) {
    this.authErrorMessage = "";

    console.log(user);

    if (user) {
      this.authService.login(user)
        .subscribe(data => {
          console.log(data);
          console.log(`User ${user.getUsername()} logged!`);
          this.toggleModal();
        }, error => {
          console.log(error);
          this.showErrorInModal(error);
        });
    }
  }

  isLoggedIn() {
    this.authService.isLoggedIn();
  }
}

