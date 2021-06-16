import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDividerModule} from "@angular/material/divider";
import {FilePickerDirective} from "../shared/directive/file-picker.directive";
import {LogInComponent} from "../account/log-in/log-in.component";
import {TodoListComponent} from "../toDolist/todo-list/todo-list.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    UserProfileComponent,
    FilePickerDirective
  ],
  entryComponents: [],
  exports: [
    FilePickerDirective
  ],
})
export class UsersModule { }
