import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  post(url: string, data: any): Observable<any> {
    return this.httpClient.post(url, data);
  }

  getFile(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  postFile(url: string, file: File): Observable<any> {

    let fileFormData: FormData = new FormData();
    fileFormData.append("file", file, file.name);

    let headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
    let options = {
      headers: headers
    }

    return this.httpClient.post(url, fileFormData, options);
  }
}
