import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import {By} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/AuthService";
import {DebugElement} from "@angular/core";

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  const dialogMock = {close: () => { }};


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, MatDialogModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientModule, MatInputModule, BrowserAnimationsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock}],
      declarations: [ LogInComponent ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth login method', async(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    authService = debugElement.injector.get(AuthService);
    const loginSpy = spyOn(authService, 'login').and.callThrough();
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('button'));
    // to set values
    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin1');
    loginElement.triggerEventHandler('click', null);
    expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
    // expect(spy).toHaveBeenCalled();
  }));

});
