import { Component, OnInit } from '@angular/core';
import Utilities from '../shared/classes/utilities';
import FileConstants from './constants/file-constants';
import Endpoints from '../shared/constants/endpoints';
import { NetworkService } from '../shared/services/network.service';
import FILE_CONSTANTS from './constants/file-constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recognitionResults: { description: string, score: number }[] = [];

  constants: any = FILE_CONSTANTS;

  fileInsertedType: number = this.constants.FILE_IS_NOT_INSERTED;
  changeColorAgain: Subject<void> = new Subject<void>();

  constructor(private network: NetworkService) { }

  ngOnInit() {
    this.changeColorAgain.subscribe(() => {
      setTimeout(() => {
        this.fileInsertedType = this.constants.FILE_IS_NOT_INSERTED;
      }, 3000);
    });
  }

  loadFile(fileList: FileList) {
    let file: File = fileList[0];

    // TODO do a directive about
    if (Utilities.isFileAImage(file)) {
      this.fileInsertedType = this.constants.FILE_IS_IMAGE;

      this.network.postFile(Endpoints.IMAGE_RECOGNITION, file).subscribe((recognitionResults: any[]) => {
        this.fileInsertedType = this.constants.IMAGE_UPLOADED;
        console.log("Returns from BE service : ");
        console.log(recognitionResults);

        this.recognitionResults = recognitionResults.map(result => {
          return { description: result.description, score: Math.round(result.score * 100) };
        })
      }, (error) => {
        this.fileInsertedType = this.constants.IMAGE_UPLOADING_FAILED;
        this.changeColorAgain.next();
      });
    }
    else {
      this.fileInsertedType = this.constants.FILE_IS_NOT_AN_IMAGE;
      this.changeColorAgain.next();
    }
  }

  restoreFileInsertion() {
    this.fileInsertedType = this.constants.FILE_IS_NOT_INSERTED;
    this.recognitionResults = [];
  }

}
