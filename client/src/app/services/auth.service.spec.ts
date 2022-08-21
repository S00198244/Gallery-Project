// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { Login } from '../interfaces/login';
import { Signup } from '../interfaces/signup';

describe('AuthService', () => {
  let service: AuthService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);

    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Testing login

  it('Login should return value from observable', () => {
    const testData: Login = { email: 'userEmail', password: 'userPass'};

    service.login(testData).subscribe(data => {
      expect(data).toBe('observable value');
      // done();
    });
  });

  // Testing signup

  it('Signup should return value from observable', () => {
    const testData: Signup = { firstName: 'firstName', lastName: 'lastName', email: 'userEmail', password: 'userPass'};

    service.signup(testData).subscribe(data => {
      expect(data).toBe('observable value');
      // done();
    });
  });
});
