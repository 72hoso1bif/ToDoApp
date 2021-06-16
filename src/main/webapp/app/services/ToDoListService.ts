import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {ToDoList, ToDoListDTO} from "../models/todolist";
import {environment} from "../../environments/environment";
import {AuthService} from "./AuthService";
import {map} from "rxjs/operators";



@Injectable({ providedIn: 'root' })
export class ToDoListService {

  private toDoListDataSubject: BehaviorSubject<ToDoList[]>;
  private toDoListData: Observable<ToDoList[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.toDoListDataSubject = new BehaviorSubject<ToDoList[]>(JSON.parse(localStorage.getItem('toDoListData')));
    this.toDoListData = this.toDoListDataSubject.asObservable();
  }

  createTodo(todoList: ToDoListDTO): Observable<ToDoListDTO> {
    return this.http.post<ToDoListDTO>(`${environment.apiUrl}/api/todo/create`, todoList,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  updateTodo(todoList: ToDoListDTO): Observable<ToDoListDTO> {
    return this.http.put<ToDoListDTO>(`${environment.apiUrl}/api/todo/save`, todoList,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  deleteTodo(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/todo/delete/${id}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  loadAllTodos(userId: number): Observable<ToDoList[]> {
    return this.http.get<ToDoList[]>(`${environment.apiUrl}/api/todo/all/${userId}`, this.authService.createHeaderOption(true, '', '', '', ''));
  }

  public toDoListDataValue(): ToDoList[] {
    return this.toDoListDataSubject.value;
  }

  public getToDoListDataSubject(): BehaviorSubject<ToDoList[]> {
    return this.toDoListDataSubject;
  }

}
