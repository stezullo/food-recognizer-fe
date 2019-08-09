import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { FileDropDirective } from './directives/file-drop.directive';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { SharedModule } from '../shared/shared.module';
import { ShowRecognitionResultsComponent } from './components/show-recognition-results/show-recognition-results.component';

@NgModule({
  declarations: [HomeComponent, FileDropDirective, UploadButtonComponent, ShowRecognitionResultsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    SharedModule
  ]
})
export class HomeModule { }
