import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionQuery } from 'src/app/store/session.query';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  authError = false;
  authErrorMsg!: string;

  signupForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),
    });

  }

  onSubmit() {

    // console.log("In onSubmit()");

    this.submitted = true; 

    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(this.signupForm.value)
      .subscribe(() => {
        // Successful signup
        this.router.navigate(['/events']);
      },
      (error) => {
        // Failed signup
        this.authError = true;
        (this.authErrorMsg = error.error)
      });
  }
}
