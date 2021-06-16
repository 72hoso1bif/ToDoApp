import {AuthService} from "./AuthService";
import {Router} from "@angular/router";
import {TestBed} from "@angular/core/testing";
import {User} from "../models";
import {of} from "rxjs";

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthService] });
  });
});
