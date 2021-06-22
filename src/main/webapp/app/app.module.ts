import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { HomeComponent } from './home/home.component';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
import {LogInComponent} from "./account/log-in/log-in.component";
import {AccountModule} from "./account/account.module";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TodoListComponent} from "./toDolist/todo-list/todo-list.component";
import {ToDoListModule} from "./toDolist/toDoList.module";
import {MatChipsModule} from "@angular/material/chips";
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { OrderByPipe } from './shared/pipes/order-by.pipe';
import { HasAuthorityDirective } from './shared/directive/has-authority.directive';
import { FilePickerDirective } from './shared/directive/file-picker.directive';
import {UsersModule} from "./users/users.module";
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavbarComponent,
    OrderByPipe,
    HasAuthorityDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ToDoListModule,
    UsersModule,
    AccountModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatIconModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatChipsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [LogInComponent, TodoListComponent],
    exports: [
        FilePickerDirective
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
