import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListTaskModalComponent } from './to-do-list-task-modal.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ToDoListModule} from "../toDoList.module";
import {UsersModule} from "../../users/users.module";
import {AccountModule} from "../../account/account.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FlexModule} from "@angular/flex-layout";
import {AlertModule} from "../../alert/alert.module";
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/AuthService";
import {ToDoListService} from "../../services/ToDoListService";
import {ToDoSharedDataService} from "../../services/toDoSharedDataService";
import {IconPickerModule} from "ngx-icon-picker";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

describe('ToDoListTaskModalComponent', () => {
  let component: ToDoListTaskModalComponent;
  let fixture: ComponentFixture<ToDoListTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatNativeDateModule,
        AlertModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{provide: MatDialogRef, useValue: {}}],
      declarations: [ ToDoListTaskModalComponent ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
