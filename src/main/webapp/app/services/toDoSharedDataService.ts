import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToDoList} from "../models/todolist";
import {ToDoListTask} from "../models/todolisttask";
import {ToDoListService} from "./ToDoListService";
import {ToDoTaskService} from "./ToDoTaskService";
import {AlertService} from "./alert.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {AuthService} from "./AuthService";

@Injectable({ providedIn: 'root' })
export class ToDoSharedDataService {

  // tslint:disable-next-line:variable-name
  _toDoListData: Observable<ToDoList[]>;
  // tslint:disable-next-line:variable-name
  _toDoListSubject: BehaviorSubject<ToDoList[]> = new BehaviorSubject<ToDoList[]>(null);
  dailyCount: number;
  missedCount: number;
  importantCount: number;
  weeklyCount: number;

  constructor(
    private toDoListService: ToDoListService,
    private toDoTaskService: ToDoTaskService,
    private authService: AuthService
  ) {
    this._toDoListData = this._toDoListSubject.asObservable();
  }

  updateToDoList(): void {
    this.toDoListService.loadAllTodos(Number(this.authService.userValue.id))
      .subscribe((todoList) => {
        this.toDoListSubject.next(this.mapToDoList(todoList));
        this.loadCountsForFixLists();
      });
  }

  get toDoListSubject(): BehaviorSubject<ToDoList[]> {
    return this._toDoListSubject;
  }

  set toDoListSubject(toDoListSubject: BehaviorSubject<ToDoList[]>) {
    this._toDoListSubject = toDoListSubject;
  }

  get toDoListData(): ToDoList[] {
    return this._toDoListSubject.value;
  }

  mapToDoList(todos: ToDoList[]) {
    const mappedTodos = [];
    for (let todo of todos) {
      this.toDoTaskService.countAllByToDoListId(todo.id).subscribe(value => {
        if (this.isToday(new Date(todo.createdAt))) {
          todo = {
            ...todo,
            taskCount: value,
            isNew: true
          };
        } else {
          todo = {
            ...todo,
            taskCount: value
          };
        }
        mappedTodos.push(todo);
      });
    }
    return mappedTodos;
  }

  isToday = (someDate) => {
    someDate = new Date(someDate);
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  }

  private loadCountsForFixLists() {
    this.toDoTaskService.countByDailyTasks(Number(this.authService.userValue.id)).subscribe(count => {
      this.dailyCount = count;
    });
    this.toDoTaskService.countByImportantTasks(Number(this.authService.userValue.id)).subscribe(count => {
      this.importantCount = count;
    });
    this.toDoTaskService.countByMissedTasks(Number(this.authService.userValue.id)).subscribe(count => {
      this.missedCount = count;
    });
    this.toDoTaskService.countByWeeklyTasks(Number(this.authService.userValue.id)).subscribe(count => {
      this.weeklyCount = count;
    });
  }

}
