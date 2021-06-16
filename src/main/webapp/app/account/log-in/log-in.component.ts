import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/AuthService';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OpenModalService} from '../../services/openModalService';
import {RegisterComponent} from '../register/register.component';
import {ToDoSharedDataService} from "../../services/toDoSharedDataService";
import {ToDoListService} from "../../services/ToDoListService";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<LogInComponent>,
    private dialog: MatDialog,
    private openModalService: OpenModalService,
    private toDoListService: ToDoListService,
    private toDoSharedDataService: ToDoSharedDataService,

  ) {
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login({username: this.f.username.value, password: this.f.password.value})
      .pipe(first())
      .subscribe(
        data => {
          this.dialogRef.close();
          // this.toDoListService.getToDoListByUserId().subscribe(todos => {
          //   this.router.navigate([this.returnUrl]);
          // });
          this.toDoSharedDataService.updateToDoList();
        },
        error => {
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.openModalService.openRegisterDialog();
  }

}
