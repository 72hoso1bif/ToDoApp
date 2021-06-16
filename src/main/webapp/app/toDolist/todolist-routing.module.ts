import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {ToDoListTasksComponent} from "./to-do-list-tasks/to-do-list-tasks.component";
import {TodoListComponent} from "./todo-list/todo-list.component";


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: ToDoListTasksComponent},
      { path: 'create', component: TodoListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToDoListRoutingModule { }
