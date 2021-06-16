import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {User} from '../models';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from '../services/AuthService';
import {catchError, finalize} from 'rxjs/operators';
import {UserService} from '../services/UserService';


export class UserDataSource implements DataSource<User> {

  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }

  loadUsers() {

    this.loadingSubject.next(true);

    this.userService.getAll().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(users => this.userSubject.next(users));
  }

  getValue() {
    return this.userSubject.getValue();
  }

}
