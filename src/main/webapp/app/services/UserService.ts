import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../models';
import {AuthService} from './AuthService';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users/all`, this.authService.createHeaderOption(true, '', '', '', ''));
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiUrl}/api/users/get/${id}`, this.authService.createHeaderOption(false, '', '', '', ''));
  }

  update(id, newUser) {
    return this.http.put(`${environment.apiUrl}/api/users/update/`, newUser,
      this.authService.createHeaderOption(false, '', '', '', ''))
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.authService.userValue.id) {
          // update local storage and store new User to Subject
         this.getById(this.authService.userValue.id).subscribe(user => {
            this.authService.getUserSubject.next(user);
            this.authService.setUserImageUrlIfUserHasImage();
            localStorage.setItem('user', JSON.stringify(user));
          });
        }
        return x;
      }));
  }

  updateByAdmin(id, newUser) {
    return this.http.put(`${environment.apiUrl}/api/users/update/${id}`, newUser,
      this.authService.createHeaderOption(false, '', '', '', ''))
      .pipe(map(x => {
        // update stored user if the logged in user updated their own record
        if (id === this.authService.userValue.id) {
          this.getById(this.authService.userValue.id).subscribe(user => {
            this.authService.getUserSubject.next(user);
            this.authService.setUserImageUrlIfUserHasImage();
            localStorage.setItem('user', JSON.stringify(user));
          });
        }
        return x;
      }));
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/api/users/delete/${id}`, this.authService.createHeaderOption(false, '', '', '', ''))
      .pipe(map(x => {
        // auto logout if the logged in user deleted their own record
        if (id === this.authService.userValue.id) {
          this.authService.logout();
        }
        return x;
      }));
  }

}
