import {NgModule, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TodoListComponent} from './todo-list/todo-list.component';
import {ToDoListRoutingModule} from './todolist-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import { LayoutComponent } from './layout/layout.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ToDoListTasksComponent } from './to-do-list-tasks/to-do-list-tasks.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";
import {IconPickerModule} from "ngx-icon-picker";
import { ToDoListTaskModalComponent } from './to-do-list-task-modal/to-do-list-task-modal.component';
import {AlertModule} from "../alert/alert.module";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToDoListRoutingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSortModule,
        MatButtonModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        MatCardModule,
        MatChipsModule,
        MatSelectModule,
        MatButtonToggleModule,
        DragDropModule,
        MatDialogModule,
        FlexModule,
        IconPickerModule,
        AlertModule,
    ],
  declarations: [
    TodoListComponent,
    LayoutComponent,
    ToDoListTasksComponent,
    ToDoListTaskModalComponent
  ],
  entryComponents: [TodoListComponent, ToDoListTaskModalComponent]
})
export class ToDoListModule {}
