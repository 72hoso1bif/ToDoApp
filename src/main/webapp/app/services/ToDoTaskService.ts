import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subscription} from "rxjs";
import {ToDoList, ToDoListDTO} from "../models/todolist";
import {environment} from "../../environments/environment";
import {AuthService} from "./AuthService";
import {ToDoListTask} from "../models/todolisttask";


@Injectable({ providedIn: 'root' })
export class ToDoTaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  createTodoTask(todoListTask: ToDoListTask): Observable<ToDoListTask> {
    return this.http.post<ToDoListTask>(`${environment.apiUrl}/api/todotask/create`, todoListTask,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  updateTodoTask(todoListTask: ToDoListTask): Observable<ToDoListTask> {
    return this.http.put<ToDoListTask>(`${environment.apiUrl}/api/todotask/save`, todoListTask,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  deleteTodoTask(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/todotask/delete/${id}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  getToDoTasksByToDoListId(id) {
    return this.http.get<ToDoListTask[]>(`${environment.apiUrl}/api/todotask/all/${id}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  findAllDailyTasks(userId: number) {
    return this.http.get<ToDoListTask[]>(`${environment.apiUrl}/api/todotask/daily/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  findAllImportantTasks(userId: number) {
    return this.http.get<ToDoListTask[]>(`${environment.apiUrl}/api/todotask/important/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  findAllMissedTasks(userId: number) {
    return this.http.get<ToDoListTask[]>(`${environment.apiUrl}/api/todotask/missed/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  findAllWeeklyTasks(userId: number) {
    return this.http.get<ToDoListTask[]>(`${environment.apiUrl}/api/todotask/weekly/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  countAllByToDoListId(id) {
    return this.http.get<number>(`${environment.apiUrl}/api/todotask/count/${id}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  countByDailyTasks(userId: number) {
    return this.http.get<number>(`${environment.apiUrl}/api/todotask/count/daily/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  countByImportantTasks(userId: number) {
    return this.http.get<number>(`${environment.apiUrl}/api/todotask/count/important/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  countByMissedTasks(userId: number) {
    return this.http.get<number>(`${environment.apiUrl}/api/todotask/count/missed/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

  countByWeeklyTasks(userId: number) {
    return this.http.get<number>(`${environment.apiUrl}/api/todotask/count/weekly/${userId}`,
      this.authService.createHeaderOption(true, '', '', '', ''));
  }

}
