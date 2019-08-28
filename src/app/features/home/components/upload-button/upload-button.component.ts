import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css']
})
export class UploadButtonComponent implements OnInit {

  readonly FILE_CONSTANTS: any;

  fileInsertedType: number;


  constructor(private uploadService: UploadFileService) {
    this.FILE_CONSTANTS = this.uploadService.FILE_CONSTANTS;
  }

  ngOnInit() {
    this.uploadService.fileInsertedType.subscribe((fileInsertedType) => {
      this.fileInsertedType = fileInsertedType;
    });

    this.resetStatus();
    this.uploadService.changeColorAgain.subscribe(() => {
      setTimeout(() => {
        this.resetStatus();
      }, 3000);
    });
  }

  loadFile(event: any) {
    this.uploadService.loadFile(event);
  }

  resetStatus() {
    this.uploadService.resetStatus();
  }

}
