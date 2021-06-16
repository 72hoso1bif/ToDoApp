import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from '../services/AuthService';
import {catchError, finalize} from 'rxjs/operators';
import {UserService} from '../services/UserService';
import {ToDoList} from '../models/todolist';
import {ToDoListService} from "../services/ToDoListService";


export class ToDoListDataSource implements DataSource<ToDoList> {

  private toDoListSubject = new BehaviorSubject<ToDoList[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService, private authService: AuthService, private toDoService: ToDoListService) {}

  connect(collectionViewer: CollectionViewer): Observable<ToDoList[]> {
    return this.toDoListSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.toDoListSubject.complete();
    this.loadingSubject.complete();
  }


  getValue() {
    return this.toDoListSubject.getValue();
  }

}
