import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListComponent} from './list.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ActivatedRoute, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {of, Subject} from "rxjs";
import {UserService} from "../../services/UserService";
import {MatDialogModule} from "@angular/material/dialog";
import {RegisterComponent} from "../../account/register/register.component";
import {MatSortModule} from "@angular/material/sort";
import {FakeSubject} from "../../account/log-in/log-in.component.spec";
import {UserDataSource} from "../UserDataSource";
import {NO_ERRORS_SCHEMA} from "@angular/core";

const userServiceSpy = jasmine.createSpyObj('UserService', ['getAll']);
const alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear','error', 'clear']);
const titleServiceSpy = jasmine.createSpyObj('Title', ['setTitle']);
const openModalServiceSpy = jasmine.createSpyObj('OpenModalService', ['openRegisterDialog']);
const userDataSourceServiceSpy = jasmine.createSpyObj('UserDataSource', ['loadUsers']);

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(async(() => {
    component = new ListComponent(userServiceSpy,alertServiceSpy,titleServiceSpy, openModalServiceSpy);
  }))

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        MatDialogModule, RouterTestingModule, MatProgressSpinnerModule, MatInputModule, MatIconModule,
        MatTableModule, MatSortModule, MatTooltipModule, MatPaginatorModule, HttpClientModule

      ],
      providers: [{provide: ActivatedRoute, userValue: {}}, {provide: UserService, userValue: userServiceSpy}, {provide: UserDataSource, useValue: userDataSourceServiceSpy}],
      declarations: [ ListComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
