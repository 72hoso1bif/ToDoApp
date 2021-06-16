import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ToDoList} from "../models/todolist";
import {ToDoListTask} from "../models/todolisttask";
import {ToDoListService} from "./ToDoListService";
import {ToDoTaskService} from "./ToDoTaskService";
import {AlertService} from "./alert.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {filter} from "rxjs/operators";
import {AuthService} from "./AuthService";

@Injectable({ providedIn: 'root' })
export class ToDoTaskSharedDataService {


  toDoListTaskData: Observable<ToDoListTask[]>;
  toDoListTaskInProgressData: Observable<ToDoListTask[]>;
  toDoListTaskDoneData: Observable<ToDoListTask[]>;

  toDoListTaskSubject: BehaviorSubject<ToDoListTask[]> = new BehaviorSubject<ToDoListTask[]>(null);
  toDoListTaskInProgressSubject: BehaviorSubject<ToDoListTask[]> = new BehaviorSubject<ToDoListTask[]>(null);
  toDoListTaskDoneSubject: BehaviorSubject<ToDoListTask[]> = new BehaviorSubject<ToDoListTask[]>(null);


  toDoListId: number;
  toDoListName: string;
  datePicker: string;
  searchValue: string;

  inEditMode: boolean;

  constructor(
    private toDoListService: ToDoListService,
    private toDoTaskService: ToDoTaskService,
    private authService: AuthService,
  ) {
    this.toDoListTaskData = this.toDoListTaskSubject.asObservable();
    this.toDoListTaskInProgressData = this.toDoListTaskInProgressSubject.asObservable();
    this.toDoListTaskDoneData = this.toDoListTaskDoneSubject.asObservable();
  }

  updateTasks(listType, id): void {
    if (listType === 'By Id') {
      this.clearToDoTaskValues();
      this.toDoListId = id;
      this.getToDoListTaskById();

    } else if (listType === 'Important') {
      this.clearToDoTaskValues();
      this.getImportant();

    } else if (listType === 'My Day') {
      this.clearToDoTaskValues();
      this.getDaily();

    } else if (listType === 'Missed') {
      this.clearToDoTaskValues();
      this.getMissed();
    } else if (listType === 'My Week') {
      this.clearToDoTaskValues();
      this.getWeekly();
    }
  }

  clearToDoTaskValues() {
    this.toDoListTaskSubject.next(null);
    this.toDoListTaskInProgressSubject.next(null);
    this.toDoListTaskDoneSubject.next(null);
  }

  getToDoListTaskById() {
    this.toDoTaskService.getToDoTasksByToDoListId(this.toDoListId)
      .pipe(filter((e) => !!e))
      .subscribe((todos: ToDoListTask[]) => {
        this.setValueByStatus(todos);
      });
  }
  getDaily() {
    this.toDoTaskService.findAllDailyTasks(Number(this.authService.userValue.id))
      .pipe(filter((e) => !!e))
      .subscribe((todos) => {
        this.setValueByStatus(todos);
      });
  }
  getImportant() {
    this.toDoTaskService.findAllImportantTasks(Number(this.authService.userValue.id))
      .pipe(filter((e) => !!e))
      .subscribe((todos) => {
        this.setValueByStatus(todos);
      });
  }
  getMissed() {
    this.toDoTaskService.findAllMissedTasks(Number(this.authService.userValue.id))
      .pipe(filter((e) => !!e))
      .subscribe((todos: ToDoListTask[]) => {
        this.setValueByStatus(todos);
      });
  }
  getWeekly() {
    this.toDoTaskService.findAllWeeklyTasks(Number(this.authService.userValue.id))
      .pipe(filter((e) => !!e))
      .subscribe((todos: ToDoListTask[]) => {
        this.setValueByStatus(todos);
      });
  }


  setValueByStatus(todos: ToDoListTask[]) {
    const todosTODO: ToDoListTask[] = [];
    const todosINPROGRESS: ToDoListTask[] = [];
    const todosDONE: ToDoListTask[] = [];

    for (const todo of todos) {
      if (todo.status === 'TASK_STATUS_DONE') {
        todosDONE.push(todo);
      } else if (todo.status === 'TASK_STATUS_TODO') {
        todosTODO.push(todo);
      } else if (todo.status === 'TASK_STATUS_IN_PROGRESS') {
        todosINPROGRESS.push(todo);
      }
    }

    this.toDoListTaskSubject.next(todosTODO);
    this.toDoListTaskInProgressSubject.next(todosINPROGRESS);
    this.toDoListTaskDoneSubject.next(todosDONE);
  }

  getCase() {
    switch (this.toDoListName) {
      case 'Important': return this.getImportant();
      case 'My Day': return this.getDaily();
      case 'Missed': return this.getMissed();
      case 'My Week': return this.getWeekly();
      default: return this.getToDoListTaskById();
    }
  }

  get toDoTaskSubject(): BehaviorSubject<ToDoListTask[]> {
    return this.toDoListTaskSubject;
  }
  get toDoTaskDoneSubject(): BehaviorSubject<ToDoListTask[]> {
    return this.toDoListTaskDoneSubject;
  }
  get toDoTaskInProgressSubject(): BehaviorSubject<ToDoListTask[]> {
    return this.toDoListTaskInProgressSubject;
  }

  setToDoTaskSubject(toDoTaskSubject: BehaviorSubject<ToDoListTask[]>) {
    this.toDoListTaskSubject = toDoTaskSubject;
  }
  setToDoTaskDoneSubject(toDoTaskDoneSubject: BehaviorSubject<ToDoListTask[]>) {
    this.toDoListTaskDoneSubject = toDoTaskDoneSubject;
  }

  setToDoTaskInProgressSubject(toDoTaskInProgressSubject: BehaviorSubject<ToDoListTask[]>) {
    this.toDoListTaskInProgressSubject = toDoTaskInProgressSubject;
  }

  get toDoTaskData(): ToDoListTask[] {
    return this.toDoListTaskSubject.value;
  }

  get toDoTaskDoneData(): ToDoListTask[] {
    return this.toDoListTaskDoneSubject.value;
  }

  get toDoTaskInProgressData(): ToDoListTask[] {
    return this.toDoListTaskInProgressSubject.value;
  }
}
