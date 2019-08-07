import { Component, OnInit } from '@angular/core';
import Utilities from '../shared/classes/utilities';
import FileConstants from './constants/file-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private fileInsertedType: number = FileConstants.FILE_IS_NOT_INSERTED;

  constructor() { }

  ngOnInit() {
  }

  drop(fileList: FileList) {
    let file: File = fileList[0];
    console.log(file);

    // TODO do a directive about
    if (Utilities.isFileAImage(file)) {
      console.log("The file that was inserted, is a image");
      this.fileInsertedType = FileConstants.FILE_IS_IMAGE;



    }
    else {
      console.log("The file that was inserted, is not a image");
      this.fileInsertedType = FileConstants.FILE_IS_NOT_AN_IMAGE;

    }
  }

}
