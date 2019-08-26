import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ModalComponent } from './components/auth/modals/modal/modal.component';



@NgModule({
  declarations: [SpinnerComponent, AuthComponent, ModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents: [ModalComponent],
  exports: [SpinnerComponent, AuthComponent]
})
export class SharedModule { }
