import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AuthService} from '../services/AuthService';
import {catchError, finalize} from 'rxjs/operators';
import {UserService} from '../services/UserService';
import {ToDoList} from '../models/todolist';
import {ToDoListService} from "../services/ToDoListService";
import {ToDoListTask} from "../models/todolisttask";
import {ToDoTaskService} from "../services/ToDoTaskService";


export class ToDoListTaskDataSource implements DataSource<ToDoListTask> {

  private toDoListTaskSubject = new BehaviorSubject<ToDoListTask[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private authService: AuthService, private toDoTaskService: ToDoTaskService) {}

  connect(collectionViewer: CollectionViewer): Observable<ToDoListTask[]> {
    return this.toDoListTaskSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.toDoListTaskSubject.complete();
    this.loadingSubject.complete();
  }

  loadToDoListTasks(id) {
    this.loadingSubject.next(true);

    this.toDoTaskService.getToDoTasksByToDoListId(id).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(toDoListTasks => {
        this.toDoListTaskSubject.next(toDoListTasks);
      });
  }

  getValue() {
    return this.toDoListTaskSubject.getValue();
  }

}
