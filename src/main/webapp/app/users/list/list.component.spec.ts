// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {ListComponent} from './list.component';
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {MatTableModule} from "@angular/material/table";
// import {MatPaginatorModule} from "@angular/material/paginator";
// import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
// import {MatButtonModule} from "@angular/material/button";
// import {MatIconModule} from "@angular/material/icon";
// import {MatTooltipModule} from "@angular/material/tooltip";
// import {MatFormFieldModule} from "@angular/material/form-field";
// import {MatInputModule} from "@angular/material/input";
// import {MatCardModule} from "@angular/material/card";
// import {MatToolbarModule} from "@angular/material/toolbar";
// import {HttpClientModule} from "@angular/common/http";
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
// import {MatSelectModule} from "@angular/material/select";
// import {MatCheckboxModule} from "@angular/material/checkbox";
// import {ActivatedRoute, RouterModule} from "@angular/router";
// import {RouterTestingModule} from "@angular/router/testing";
// import {AuthService} from "../../services/AuthService";
// import {User} from "../../models";
// import {UserDataSource} from "../UserDataSource";
// import {of} from "rxjs";
// import {UserService} from "../../services/UserService";
//
// describe('ListComponent', () => {
//   let component: ListComponent;
//   let fixture: ComponentFixture<ListComponent>;
//   let users;
//   let mockDataService;
//
//
//
//
//   beforeEach(async(() => {
//     users = [
//       {
//         id: '2',
//         email: '',
//         username: '',
//         password: '',
//         roles: ['ROLE_USER'],
//         image: null,
//         accessToken: '',
//         tokenType: 'Bearer'
//       },
//     ];
//     mockDataService = jasmine.createSpyObj('UserService', {'getALL': of(users)});
//
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientModule,
//         RouterTestingModule,
//         BrowserAnimationsModule,
//         MatButtonModule,
//         MatToolbarModule,
//         FormsModule,
//         ReactiveFormsModule,
//         MatCardModule,
//         MatFormFieldModule,
//         MatSelectModule,
//         MatInputModule,
//         MatCheckboxModule,
//         MatIconModule,
//         MatTooltipModule,
//         MatTableModule,
//         MatProgressSpinnerModule,
//         RouterModule,
//         MatPaginatorModule,
//
//       ],
//       providers: [{provide: ActivatedRoute, userValue: {}}, {provide: UserService, userValue: mockDataService}],
//       declarations: [
//         ListComponent
//       ],
//     })
//     .compileComponents();
//   }));
//
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ListComponent);
//     component = fixture.componentInstance;
//     component.users = {
//       id: '2',
//       email: '',
//       username: '',
//       password: '',
//       roles: ['ROLE_USER'],
//       image: null,
//       accessToken: '',
//       tokenType: 'Bearer'
//     };
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
