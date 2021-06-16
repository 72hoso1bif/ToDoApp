import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarComponent } from './side-navbar.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ToDoListModule} from "../toDolist/toDoList.module";
import {UsersModule} from "../users/users.module";
import {AccountModule} from "../account/account.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {JwtInterceptor} from "../helper/jwt.interceptor";
import {ErrorInterceptor} from "../helper/error.interceptor";
import {RouterTestingModule} from "@angular/router/testing";
import {AppModule} from "../app.module";
import {HasAuthorityDirective} from "../shared/directive/has-authority.directive";
import {OrderByPipe} from "../shared/pipes/order-by.pipe";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

describe('SideNavbarComponent', () => {
  let component: SideNavbarComponent;
  let fixture: ComponentFixture<SideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, MatIconModule, MatChipsModule, MatDialogModule],
      providers: [],
      declarations: [ SideNavbarComponent, HasAuthorityDirective, OrderByPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
