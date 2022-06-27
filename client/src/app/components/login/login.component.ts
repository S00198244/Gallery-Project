import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  authError = false;
  authErrorMsg!: string;

  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {

    console.log("In onSubmit()");

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe(() => {
          // Successful login
          this.router.navigate(['/events']);
        },
        (error) => {
          // Failed login
          this.authError = true,
          (this.authErrorMsg = error.error)
        });
  }
}
