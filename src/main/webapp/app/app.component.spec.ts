import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ToDoListModule} from "./toDolist/toDoList.module";
import {UsersModule} from "./users/users.module";
import {AccountModule} from "./account/account.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {HomeComponent} from "./home/home.component";
import {SideNavbarComponent} from "./side-navbar/side-navbar.component";
import {OrderByPipe} from "./shared/pipes/order-by.pipe";
import {HasAuthorityDirective} from "./shared/directive/has-authority.directive";
import {JwtInterceptor} from "./helper/jwt.interceptor";
import {ErrorInterceptor} from "./helper/error.interceptor";

import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {AuthService} from "./services/AuthService";



describe('AppComponent', () => {

  let mockService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},],

      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});
