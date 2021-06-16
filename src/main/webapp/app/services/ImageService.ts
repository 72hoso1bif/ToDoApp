import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {AuthService} from './AuthService';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class ImageService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  uploadImage(image: File): Observable<number> {
    const data: FormData = new FormData();
    data.append('file', image);
    // const newRequest = new HttpRequest('POST', `${environment.apiUrl}/api/image/upload`, data, {
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    return this.http.post<number>(`${environment.apiUrl}/api/image/upload/`, data,
      this.authService.createHeaderOption(false, '', '', '', ''));
  }

  downloadImage(imageId: number): Observable<File> {
    return this.http.get<File>(`${environment.apiUrl}/api/image/download/${imageId}`,
      this.authService.createHeaderOption(false, '', '', '', ''));
  }

  deleteImage(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/image/delete/${id}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }


}
