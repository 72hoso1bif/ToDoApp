import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthService} from '../../services/AuthService';
import {AlertService} from '../../services/alert.service';
import {UserService} from '../../services/UserService';
import {User, UserDTO} from "../../models";
import {FilePickerDirective} from "../../shared/directive/file-picker.directive";
import {BehaviorSubject} from "rxjs";
import {ImageService} from "../../services/ImageService";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html' ,
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User;
  userProfileForm: FormGroup;

  _selectedFiles: FileList;

  hasImgUrlSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasImgUrl: boolean;

  imageId: string[] = [];


  public _buttonPicker: FilePickerDirective;

  @ViewChild('buttonPicker', { static: false }) set content(content: FilePickerDirective) {
    if ( content ) { // initially setter gets called with undefined
      this._buttonPicker = content;
    }
  }

  loading = false;
  submitted = false;
  isPermitted = false;
  hover: boolean;

  uploadedImgURL: string | ArrayBuffer = null;
  currentImgUrl: string | ArrayBuffer;
  imageEditButtonVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private alertService: AlertService,
    private imageService: ImageService,
    private titleService: Title
  ) {
    this.user = this.authService.userValue;
    this.authService.userImgURL.subscribe(value => this.currentImgUrl = value);
    this.hasImgUrlSubject.subscribe(value => this.hasImgUrl = value);
  }


  ngOnInit() {
    this.titleService.setTitle('User Profile');
    this.userProfileForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      username: ['', Validators.required],
      password: ['']
    });

    if (this.authService.isAuthenticated()) {
      this.f.email.setValue(this.authService.userValue.email);
      this.f.username.setValue(this.authService.userValue.username);
      this.setCurrentImgUrl();
    }
  }

  setCurrentImgUrl() {
    if (this.userHasImage()) {
      this.currentImgUrl = this.authService.userImageUrl;
    } else if (this.uploadedImgURL !== null) {
      this.currentImgUrl = this.uploadedImgURL;
    } else {
      this.currentImgUrl = '../../../assets/default_profile_picture.png';
    }
  }

  _onFilesChanged(files: FileList) {
    this._selectedFiles = null;
    this._selectedFiles = files;
    this.readAsDataURL(files[0]);
  }

  readAsDataURL(files) {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.currentImgUrl = reader.result;
      this.uploadedImgURL = reader.result;
    };
  }

  _onReset() {
    this._selectedFiles = null;
    this.uploadedImgURL = null;
    if (this.userHasImage()) {
      this.currentImgUrl = this.authService.userImageUrl;
    } else {
      this.currentImgUrl = '../../../assets/default_profile_picture.png';
    }

  }

  _reset() {
    this._buttonPicker.reset();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  userHasImage(): boolean {
    if (this.uploadedImgURL !== null) {
      return false;
    } else {
      return this.authService.userHasImage();
    }

  }

  // convenience getter for easy access to form fields

  get f() { return this.userProfileForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.userProfileForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.uploadedImgURL !== null) {
      if (this.userHasImage()) {
        this.imageService.deleteImage(this.user.image.id).subscribe(res => {
          this.imageService.uploadImage(this._selectedFiles[0]).pipe().subscribe(value => {
            this.updateUser(value);
          });
        });
      } else {
        this.imageService.uploadImage(this._selectedFiles[0]).pipe().subscribe(value => {
          this.updateUser(value);
        });
      }
    }
  }

  private createUser() {
    this.authService.register(this.userProfileForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('User added successfully', { keepAfterRouteChange: true , autoClose: true});
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        error => {
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
  }

  private updateUser(createdImageId: number) {
    let newUser: UserDTO;
    if (this.f.password.value) {
      newUser = {
        id: Number(this.authService.userValue.id),
        username: this.f.username.value,
        email: this.f.email.value,
        password: this.f.password.value,
        imageId: createdImageId
      };
    } else {
      newUser = {
        id: Number(this.authService.userValue.id),
        username: this.f.username.value,
        email: this.f.email.value,
        imageId: createdImageId
      };
    }

    this.userService.update(this.authService.userValue.id, newUser)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.alertService.success('Update successful', { keepAfterRouteChange: true , autoClose: true});
          this.router.navigate(['']);
        },
        error => {
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
  }

  imageZoom($event: MouseEvent) {
    const imageId = document.getElementById('avatar');
    if (imageId.style.width === '150px') {
      this.imageEditButtonVisible = false;
      imageId.style.width = '90px';
      imageId.style.height = '90px';
    } else {
      imageId.style.width = '150px';
      imageId.style.height = '150px';
      this.imageEditButtonVisible = true;
    }
  }
}
