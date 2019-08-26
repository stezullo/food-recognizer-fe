import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import User from '../../classes/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  showModal: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  handleModalClose(user: User) {
    this.toggleModal();

    console.log(user);

    if (user) {
      this.authService.login(user)
        .subscribe(data => {
          console.log(`User ${user.getUsername()} logged!`);
        }, error => {
          console.log(error);
        });
    }
  }
}
