import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileComponent} from './user-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FilePickerDirective} from "../../shared/directive/file-picker.directive";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models";
import {AuthService} from "../../services/AuthService";
import {MatMenu, MatMenuModule} from "@angular/material/menu";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule
      ],
      providers: [{provide: ActivatedRoute, userValue: {}}, {provide: Router, userValue: {}}, AuthService],
      declarations: [
        UserProfileComponent,
        FilePickerDirective
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.user = {
      id: '2',
      email: '',
      username: '',
      password: '',
      roles: ['ROLE_USER'],
      image: null,
      accessToken: '',
      tokenType: 'Bearer'
    };
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
