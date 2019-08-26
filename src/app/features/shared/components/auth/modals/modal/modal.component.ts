import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import User from 'src/app/features/shared/classes/user';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  errorMessages: any;
  form: FormGroup;

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
    this.form.markAllAsTouched();

    let user: User = Object.assign(new User(), this.form.getRawValue());

    console.log(user);

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
