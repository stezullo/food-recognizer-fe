import { Component, OnInit } from '@angular/core';
import { RecognitionResult } from '../../classes/recognition-result';
import { UploadFileService } from '../../services/upload-file/upload-file.service';

@Component({
  selector: 'app-show-recognition-results',
  templateUrl: './show-recognition-results.component.html',
  styleUrls: ['./show-recognition-results.component.scss']
})
export class ShowRecognitionResultsComponent implements OnInit {

  recognitionResults: RecognitionResult[];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
    this.uploadService.recognitionResults.subscribe((recognitionResults: RecognitionResult[]) => {
      this.recognitionResults = recognitionResults;
    });
  }

  getReliability(recognitionResult: RecognitionResult): number {
    return recognitionResult._getScore();
  }

}
