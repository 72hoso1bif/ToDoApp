import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {OpenModalService} from '../../services/openModalService';
import {ToDoSharedDataService} from "../../services/toDoSharedDataService";

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
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<LogInComponent>,
    private openModalService: OpenModalService,
    private toDoSharedDataService: ToDoSharedDataService,

  ) {

    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(user) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    user = {
      username: user.username,
      password: user.password
    }
    this.loading = true;
    this.authService.login(user)
      .pipe(first())
      .subscribe(
        data => {
          this.toDoSharedDataService.updateToDoList();
          this.router.navigate(['/']);
          this.dialogRef.close();
        },
        error => {
          if(error.includes('Bad credentials')){
            error = 'Incorrect username or password'
          }
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
  }

  openRegisterDialog() {
    this.dialogRef.close();
    this.openModalService.openRegisterDialog(false);
  }

}
