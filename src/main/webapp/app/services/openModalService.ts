import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from '../account/register/register.component';
import {Router} from '@angular/router';
import {LogInComponent} from '../account/log-in/log-in.component';
import {AuthService} from "./AuthService";
import {TodoListComponent} from "../toDolist/todo-list/todo-list.component";
import {ToDoListTaskModalComponent} from "../toDolist/to-do-list-task-modal/to-do-list-task-modal.component";

@Injectable({ providedIn: 'root' })
export class OpenModalService {

  isPermitted: boolean;

  constructor(private dialog: MatDialog, private router: Router, private authService: AuthService) {
  }

  openRegisterDialog(byAdmin) {
    const dialogRef = this.dialog.open(RegisterComponent, {
      panelClass: 'registerPanel'
    });

    dialogRef.componentInstance.byAdmin = byAdmin;
    dialogRef.afterClosed().subscribe(result => {
      if (byAdmin){
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        }
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/users/list'])
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LogInComponent, {
      panelClass: 'loginPanel'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([''], { queryParams: { loggedIn: result }});
    });
  }

  openToDoListDialog() {
    const dialogRef = this.dialog.open(TodoListComponent, {
      panelClass: 'toDoPanel'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/'], { queryParams: { loggedIn: result }});
    });
  }

  openToDoTaskDialog(toDoListIdTmp, toDoListNameTmp, inEditMode, values) {
    const dialogRef = this.dialog.open(ToDoListTaskModalComponent, {
      height: '500px',
      width: '350px'
    });
    dialogRef.componentInstance.toDoListId = toDoListIdTmp;
    dialogRef.componentInstance.toDoListName = toDoListNameTmp;
    dialogRef.componentInstance.inEditModeValues = values;
    dialogRef.componentInstance.inEditMode = inEditMode;
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/toDoList'], {queryParams: {toDoListId: toDoListIdTmp, toDoListName: toDoListNameTmp}});
    });
  }
}
