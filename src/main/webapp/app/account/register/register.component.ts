import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/AuthService';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LogInComponent} from '../log-in/log-in.component';
import {OpenModalService} from '../../services/openModalService';
import {UserDataSource} from "../../users/UserDataSource";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  byAdmin: boolean;
  dataSource: any;
  headerText: string;
  buttonText: string;

  @Output() registerSuccess = new EventEmitter();


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private openModalService: OpenModalService,
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [ Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]),
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
    });
  }

  ngOnInit() {
    if(this.byAdmin){
      this.headerText = 'Create User';
      this.buttonText = 'create';
    } else {
      this.headerText = 'Register Page';
      this.buttonText = 'Signup';
    }

  }

  // convenience getter for easy access to form fields

  get f() { return this.form.controls; }

  onSubmit(newUser) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(newUser)
      .pipe(first())
      .subscribe(
        data => {
          if(this.byAdmin){
            this.alertService.success('User added successful', { keepAfterRouteChange: true , autoClose: true });
            this.registerSuccess.emit(true);
            this.dialogRef.close();
          }else {
            this.alertService.success('Registration successful', { keepAfterRouteChange: true , autoClose: true });
            this.registerSuccess.emit(true);
            this.openLoginDialog();
          }
        },
        error => {
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
  }

  openLoginDialog() {
    this.dialogRef.close();
    this.openModalService.openLoginDialog();
  }

}


