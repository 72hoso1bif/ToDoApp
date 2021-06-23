import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../services/AuthService";
import {ToDoListService} from "../services/ToDoListService";
import {ToDoList} from "../models/todolist";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {User} from "../models";
import {ToDoSharedDataService} from "../services/toDoSharedDataService";
import {TodoListComponent} from "../toDolist/todo-list/todo-list.component";
import {HttpResponse} from "@angular/common/http";
import {OpenModalService} from "../services/openModalService";
import {first, last, map, take} from "rxjs/operators";
import {ToDoTaskService} from "../services/ToDoTaskService";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit, OnChanges {


  user: User;

  toDoListsSubject: BehaviorSubject<ToDoList[]>;
  toDoLists: ToDoList[] = [];

  userImgUrl: string | ArrayBuffer;

  isPermitted: boolean;

  constructor(
    private authService: AuthService,
    public toDoSharedDataService: ToDoSharedDataService,
    private toDoTaskService: ToDoTaskService,
    private openModalService: OpenModalService
  ) {
    this.toDoListsSubject = this.toDoSharedDataService.toDoListSubject;
    this.toDoSharedDataService.toDoListSubject.subscribe(value => this.toDoLists = value);
    this.authService.userImgURL.subscribe(value => this.userImgUrl = value);
  }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.loadTodosWhenAuth();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isAuthenticated()) {
      this.loadTodosWhenAuth();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadTodosWhenAuth(): void {
    this.toDoSharedDataService.updateToDoList();
  }

  removeChip(element: ToDoList) {
    this.toDoLists.filter((todo) => todo.isNew === true && todo.id === element.id)[0].isNew = false;
  }

  openToDoListDialog() {
    this.openModalService.openToDoListDialog();
  }

  openLoginDialog(): void {
    this.openModalService.openLoginDialog();
  }

  openRegisterDialog(): void {
    this.openModalService.openRegisterDialog();
  }

  logout() {
    this.authService.logout();
  }

}
