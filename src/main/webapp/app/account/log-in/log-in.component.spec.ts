import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/AuthService";
import {blankUser, validUser} from "../../../mocks/mocks";
import {Router} from "@angular/router";

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
const openModalServiceSpy = jasmine.createSpyObj('OpenModalService', ['openLoginDialog']);
const toDoSharedDataServiceSpy = jasmine.createSpyObj('ToDoSharedDataService', ['updateToDoList']);
const alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear','error']);

const testUserData = { id: 1, name: 'TekLoon'};

describe('Login Component Isolated Test', () => {
  let component: LogInComponent;

  beforeEach(async(() => {
    component = new LogInComponent(new FormBuilder(), routerSpy, authServiceSpy, alertServiceSpy, matDialogRefSpy, openModalServiceSpy, toDoSharedDataServiceSpy);
  }));

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onSubmit(blankUser);
    expect(component.submitted).toBeTruthy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.username, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.username, blankUser.password);
    expect(component.loginForm.invalid).toBeTruthy();
  }));
});

describe('Login Component Shallow Test', () => {
  let fixture: ComponentFixture<LogInComponent>;
  const dialogMock = {close: () => { }};

  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['username'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, MatDialogModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientModule, MatInputModule, BrowserAnimationsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock}, { provide: Router, useValue: routerSpy }, {provide: AuthService, useValue: authServiceSpy}, FormBuilder ],
      declarations: [ LogInComponent ]
    }).compileComponents();
      fixture = TestBed.createComponent(LogInComponent);
  }));

  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('.submit');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Benutzername wird benötigt');
  });

  it('Display Password Error Msg when Username is blank', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Passwort wird benötigt');
  });


  it('When username is blank, username field should display red outline ', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('is-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('is-invalid');
  });

});

describe('Login Component Integrated Test', () => {
  let fixture: ComponentFixture<LogInComponent>;
  let loginSpy;
  const dialogMock = {close: () => { }};

  function updateForm(userEmail, userPassword) {
    fixture.componentInstance.loginForm.controls['username'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, MatDialogModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientModule, MatInputModule, BrowserAnimationsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock}, { provide: Router, useValue: routerSpy }, {provide: AuthService, useValue: authServiceSpy}, FormBuilder ],
      declarations: [ LogInComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(LogInComponent);

    loginSpy = authServiceSpy.login.and.returnValue(Promise.resolve(testUserData));

  }));

  it('loginService login() should called ', fakeAsync(() => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(authServiceSpy.login).toHaveBeenCalled();
  }));

  it('should route to home if login successfully', fakeAsync(() => {
    updateForm(validUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    loginSpy = authServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
    advance(fixture);

  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});




