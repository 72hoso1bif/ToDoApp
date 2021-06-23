import {AuthService} from "./AuthService";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {RegisterComponent} from "../account/register/register.component";

describe('AuthService', () => {
  let mockAuthService;

  beforeEach(() => {
    let mockAuthService = TestBed.get(AuthService);
  });

  beforeEach(async () => {
    TestBed.configureTestingModule(
      {
        imports: [
          RouterTestingModule,
        ],
        providers: [
          {provide: AuthService, useClass: mockAuthService},
          {provide: RegisterComponent, useClass: {}},
          {provide: Router, userValue: {}}
        ]
      });
  });


  //
  // it('should login to app', () => {
  //   expect(mockAuthService.login(["admin","admin1"]).subscribe).toBe(User);
  // });
  //
  // it('should logout from app', () => {
  //   mockAuthService.logout();
  //   expect(mockAuthService.userValue).toBe(null);
  // });
  //
  // it('should register to app', () => {
  //   expect(mockAuthService.register({ email: 'test@test.de', username: 'test1234', password: 'test1234'}).subscribe).toBe("User registered successfully!");
  // });

});
