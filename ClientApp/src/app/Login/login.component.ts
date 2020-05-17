import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from './../services/auth.service';

@Component({ templateUrl: './login.component.html' })
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading = false;
  submitted = false;
  messageError=null;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthService,
  ) {
    // redirect to home if already logged in
    if (this.AuthService.getUserToken() !== null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: ['Oussidi', Validators.required],
      password: ['password', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.formLogin.controls; }

  submitLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formLogin.invalid) {
      return;
    }

    this.loading = true;
    this.AuthService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        token => {
          this.messageError = null;
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        error => {
          this.messageError = "username or passowrd incorrect";
          this.loading = false;
        });
  }
}
