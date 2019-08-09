import { Injectable } from '@angular/core';
import fileConstants from '../../constants/file-constants';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';
import Utilities from 'src/app/features/shared/classes/utilities';
import { NetworkService } from 'src/app/features/shared/services/network.service';
import Endpoints from 'src/app/features/shared/constants/endpoints';
import { RecognitionResult } from '../../classes/recognition-result';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  readonly FILE_CONSTANTS: any = fileConstants;

  fileInsertedType: Subject<number> = new Subject<number>();
  changeColorAgain: Subject<void> = new Subject<void>();
  recognitionResults: Subject<RecognitionResult[]> = new Subject<RecognitionResult[]>();

  constructor(private network: NetworkService) { }

  loadFile(event: any) {

    // Check if the file was drag & dropped or was just uploaded via system window.
    let file: File = (event instanceof Event) ? (<HTMLInputElement>event.target).files[0] : (<FileList>event)[0];

    // TODO do a directive about
    if (Utilities.isFileAImage(file)) {
      this.fileInsertedType.next(this.FILE_CONSTANTS.FILE_IS_IMAGE);

      this.network.postFile(Endpoints.IMAGE_RECOGNITION, file).subscribe((recognitionResults: any[]) => {
        this.fileInsertedType.next(this.FILE_CONSTANTS.IMAGE_UPLOADED);

        this.recognitionResults.next(
          recognitionResults.map(result => new RecognitionResult(result.description, result.score))
        );
      }, (error) => {
        this.fileInsertedType.next(this.FILE_CONSTANTS.IMAGE_UPLOADING_FAILED);
        this.changeColorAgain.next();
      });
    }
    else {
      this.fileInsertedType.next(this.FILE_CONSTANTS.FILE_IS_NOT_AN_IMAGE);
      this.changeColorAgain.next();
    }
  }

  resetStatus() {
    this.fileInsertedType.next(this.FILE_CONSTANTS.FILE_IS_NOT_INSERTED);
    this.recognitionResults.next([]);
  }

}