import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, bindCallback, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {User} from '../models';
import {ToDoSharedDataService} from "./toDoSharedDataService";
import {ToDoListService} from "./ToDoListService";

@Injectable({ providedIn: 'root' })
export class AuthService {

  public userIsPermitted = false;
  public userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public userImgURLSubject: BehaviorSubject<string | ArrayBuffer>;
  public userImgURL: Observable<string | ArrayBuffer>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.userImgURLSubject = new BehaviorSubject<string | ArrayBuffer>(null);
    this.userIsPermitted = JSON.parse(localStorage.getItem('isPermitted'));
    this.user = this.userSubject.asObservable();
    this.userImgURL = this.userImgURLSubject.asObservable();
    this.setUserImageUrlIfUserHasImage();


  }


  public get userValue(): User {
    return this.userSubject.value;
  }

  public get userImageUrl(): string | ArrayBuffer {
    return this.userImgURLSubject.value;
  }

  public get getUser(): Observable<User | null> {
    return this.user;
  }


  public get getUserSubject(): BehaviorSubject<User> {
    return this.userSubject;
  }

  setUserImageUrlIfUserHasImage() {
    if (this.userHasImage()) {
      console.log(this.userValue);
      const reader = new FileReader();
      const blob = this.b64toBlob(this.userValue.image.content, 'image/png');
      reader.readAsDataURL(blob);
      reader.onload = (_event) => {
        this.setValue(reader.result);
      };
    } else {
      this.userImgURLSubject.next('../../assets/default_profile_picture.png');
    }
  }

  setValue(result) {
    this.userImgURLSubject.next(result);
  }

  b64toBlob = (b64Data, contentType= '', sliceSize= 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, {type: contentType});
  }

  login(credentials) {
    return this.http.post<User>(`${environment.apiUrl}/api/auth/signin`, credentials)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.checkUserRole(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isPermitted', JSON.stringify(this.userIsPermitted));
        this.userSubject.next(user);
        this.setUserImageUrlIfUserHasImage();
        this.checkUserRole(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('isPermitted');
    localStorage.removeItem('toDoListData');
    this.userSubject.next(null);
    this.userImgURLSubject.next(null);
    this.router.navigate(['/home']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/api/auth/signup`, user);
  }

  createHeaderOption(withParams, filter: string, sortOrder: string, pageNumber: string, pageSize: string) {
    const header = {
      Authorization: this.userSubject.getValue().tokenType + ' ' + this.userSubject.getValue().accessToken
    };
    let requestOptions = {};
    if (withParams) {
      requestOptions = {
        headers: new HttpHeaders(header),
        params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
      };
    } else {
      requestOptions = {
        headers: new HttpHeaders(header),
      };
    }
    return requestOptions;
  }

  checkUserRole(user): boolean {
    if (user) {
      user.roles.forEach(role => {
          if (role === 'ROLE_MOD' || role === 'ROLE_ADMIN') {
            this.userIsPermitted = true;
          }
      });
    }
    return this.userIsPermitted;
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userValue || !this.userValue.roles) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    return this.userValue.roles.some((authority: string) => authorities.includes(authority));
  }

  public isAuthenticated(): boolean {
    return this.userValue !== null;
  }

  public userHasImage(): boolean {
    if (this.userValue) {
      return !!this.userValue.image;
    }
  }
}
