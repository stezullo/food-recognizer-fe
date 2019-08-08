import { Component, OnInit } from '@angular/core';
import Utilities from '../shared/classes/utilities';
import FileConstants from './constants/file-constants';
import Endpoints from '../shared/constants/endpoints';
import { NetworkService } from '../shared/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private fileInsertedType: number = FileConstants.FILE_IS_NOT_INSERTED;

  constructor(private network: NetworkService) { }

  ngOnInit() {
  }

  loadFile(fileList: FileList) {
    let file: File = fileList[0];

    // TODO do a directive about
    if (Utilities.isFileAImage(file)) {
      console.log("The file that was inserted, is a image");
      this.fileInsertedType = FileConstants.FILE_IS_IMAGE;

      this.network.postFile(Endpoints.IMAGE_RECOGNITION, file).subscribe((value: any) => {
        console.log("Returns from BE service : ");
        console.log(value);
      });
    }
    else {
      console.log("The file that was inserted, is not a image");
      this.fileInsertedType = FileConstants.FILE_IS_NOT_AN_IMAGE;

    }
  }

}
