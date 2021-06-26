import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LogInComponent} from "../log-in/log-in.component";
import {blankUser, blankUserRegister, validUser, validUserRegister} from "../../../mocks/mocks";
import {Router} from "@angular/router";
import {AuthService} from "../../services/AuthService";
import {Subject} from "rxjs";
import {FakeSubject} from "../log-in/log-in.component.spec";
import {NO_ERRORS_SCHEMA} from "@angular/core";

const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
const openModalServiceSpy = jasmine.createSpyObj('OpenModalService', ['openLoginDialog']);
const alertServiceSpy = jasmine.createSpyObj('AlertService', ['clear','error', 'clear']);

const testUserData = { id: 1, email: 'tester@tester.de', name: 'tester'};

describe('Register Component Isolated Test', () => {
  let component: RegisterComponent;

  beforeEach(async(() => {
    component = new RegisterComponent(new FormBuilder(), authServiceSpy, alertServiceSpy, matDialogRefSpy, openModalServiceSpy);
  }));


  function updateForm(userEmail, userName, userPassword) {
    component.form.controls['email'].setValue(userEmail);
    component.form.controls['username'].setValue(userName);
    component.form.controls['password'].setValue(userPassword);
  }

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onSubmit(blankUserRegister);
    expect(component.submitted).toBeTruthy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUserRegister.email, validUserRegister.username, validUser.password);
    expect(component.form.value).toEqual(validUserRegister);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUserRegister.email, blankUserRegister.username, blankUserRegister.password);
    expect(component.form.invalid).toBeTruthy();
  }));
});

describe('Register Component Shallow Test', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  const dialogMock = {close: () => { }};

  function updateForm(userEmail, userName, userPassword) {
    fixture.componentInstance.form.controls['email'].setValue(userEmail);
    fixture.componentInstance.form.controls['username'].setValue(userName);
    fixture.componentInstance.form.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, MatDialogModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientModule, MatInputModule, BrowserAnimationsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock}, {provide: AuthService, useValue: authServiceSpy},{provide: Subject, useValue: FakeSubject},  FormBuilder ],
      declarations: [ RegisterComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);
  }));

  it('created a form with email, username and password input and register button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const emailContainer = fixture.debugElement.nativeElement.querySelector('#email-container');
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const registerBtnContainer = fixture.debugElement.nativeElement.querySelector('.submit');
    expect(emailContainer).toBeDefined();
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(registerBtnContainer).toBeDefined();
  });

  it('Display Email Error Msg`s when Email is blank, has wrong pattern and is too large', () => {
    updateForm(blankUserRegister.email, validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const emailErrorMsg = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(emailErrorMsg).toBeDefined();
    expect(emailErrorMsg.innerHTML).toContain('email is required');

    updateForm('test.de', validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(emailErrorMsg.innerHTML).toContain('False format');

    updateForm('test@test123456789012345678901234562312131231231231231237801234567890234.de', validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(emailErrorMsg.innerHTML).toContain('Email should be not more than 50 characters');
  });

  it('Display Username Error Msg when Username is blank and too short', () => {
    updateForm(validUserRegister.email, blankUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Username is required');

    updateForm(validUserRegister.email, 'ab', validUserRegister.password);
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(usernameErrorMsg.innerHTML).toContain('Username must be at least 3 characters');

  });

  it('Display Password Error Msg when password is blank and too short', () => {
    updateForm(validUserRegister.email, validUserRegister.username, blankUserRegister.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('.invalid-feedback');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Password is required');

    updateForm(validUserRegister.email, validUserRegister.username, '1234');
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(passwordErrorMsg.innerHTML).toContain('Password must be at least 6 characters');
  });


  it('When email is blank, has wrong pattern and is too large, email field should display red outline ', () => {
    updateForm(blankUserRegister.email, validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const emailInput = inputs[0];

    expect(emailInput.classList).toContain('is-invalid');

    updateForm('test.de', validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(emailInput.classList).toContain('is-invalid');

    updateForm('test@test123456789012345678901234567801234567890.de', validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(emailInput.classList).toContain('is-invalid');

  });

  it('Username is blank and too short, username field should display red outline ', () => {
    updateForm(validUserRegister.email, blankUserRegister.username, validUserRegister.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const usernameInput = inputs[1];

    expect(usernameInput.classList).toContain('is-invalid');

    updateForm(validUserRegister.email, 'ab', validUserRegister.password);
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(usernameInput.classList).toContain('is-invalid');
  });

  it('When password is blank and too short, password field should display red outline ', () => {
    updateForm(validUserRegister.email, validUserRegister.username, blankUserRegister.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[2];

    expect(passwordInput.classList).toContain('is-invalid');

    updateForm(validUserRegister.email, validUserRegister.username, '1234');
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(passwordInput.classList).toContain('is-invalid');
  });
});

describe('Register Component Integrated Test', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let registerSpy;
  const dialogMock = {close: () => { }};

  function updateForm(userEmail, userName, userPassword) {
    fixture.componentInstance.form.controls['email'].setValue(userEmail);
    fixture.componentInstance.form.controls['username'].setValue(userName);
    fixture.componentInstance.form.controls['password'].setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, FormsModule, MatDialogModule, ReactiveFormsModule,
        RouterTestingModule, HttpClientModule, MatInputModule, BrowserAnimationsModule],
      providers: [{provide: MatDialogRef, useValue: dialogMock}, {provide: AuthService, useValue: authServiceSpy}, {provide: Subject, useValue: FakeSubject}, FormBuilder ],
      declarations: [ RegisterComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterComponent);

    registerSpy = authServiceSpy.register.and.returnValue(Promise.resolve(testUserData));

  }));

  it('authService register() should called ', fakeAsync(() => {
    updateForm(validUserRegister.email, validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(authServiceSpy.register).toHaveBeenCalled();
  }));

  it('should route to to login if registered successfully', fakeAsync(async () => {
    updateForm(validUserRegister.email, validUserRegister.username, validUserRegister.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    registerSpy = authServiceSpy.register.and.returnValue(Promise.resolve(testUserData));
    advance(fixture);

    let spy = {
      getAsync: async function() {
        await openModalServiceSpy.openLoginDialog();
        return "async result";
      }
    }

    spyOn(spy, 'getAsync').and.callThrough()
    expect(await spy.getAsync()).toEqual("async result");
  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});
