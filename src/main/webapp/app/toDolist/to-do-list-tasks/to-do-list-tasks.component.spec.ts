import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoListTasksComponent } from './to-do-list-tasks.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";
import {from} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../../services/AuthService";

describe('ToDoListTasksComponent', () => {
  let component: ToDoListTasksComponent;
  let fixture: ComponentFixture<ToDoListTasksComponent>;



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
        CommonModule,
        FormsModule,
        MatSelectModule,
        DragDropModule,
        MatCardModule,
        HttpClientModule,
        RouterModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [{provide: Router, useValue: {}}, {provide: ActivatedRoute,
        useValue: {
          queryParams: from([{id: 1}]),
        }}, AuthService],
      declarations: [ ToDoListTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
