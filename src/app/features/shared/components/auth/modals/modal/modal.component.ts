import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import User from 'src/app/features/shared/classes/user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthComponent } from '../../auth.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  errorMessages: any;
  form: FormGroup;

  @Input() authErrorMessage: string;
  @Output() onClose: EventEmitter<User> = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.errorMessages = {
      'username': [
        { type: 'required', message: "Username is required." }
      ],
      'password': [
        { type: 'required', message: "Password is required." }
      ]
    };

    this.form = this.formBuilder.group({
      username: new FormControl('',
        {
          validators: Validators.compose([
            Validators.required
          ])
        },
      ),
      password: new FormControl('',
        {
          validators: Validators.compose([
            Validators.required
          ])
        }
      )
    });
  }



  private resetForm() {
    this.form.reset({
      'username': '',
      'password': ''
    });
    this.form.setErrors(null);
  }

  login() {
    let user: User = Object.assign(new User(), this.form.getRawValue());
    this.onClose.emit(user);
  }

  cancel() {
    this.resetForm();
    this.onClose.emit(null);
  }

  hasFormError(): boolean {
    return !this.form.valid;
  }
}
