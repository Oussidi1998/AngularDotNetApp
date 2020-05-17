import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { User } from './models/user';

@Component({ selector: 'app', templateUrl: './app.component.html' })
export class AppComponent {
  currentUser: User;


  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {
    if (AuthService.getUserToken() !== null) {
      this.AuthService.getUserData().subscribe(x => this.currentUser = x.value);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.AuthService.logout();
    this.router.navigateByUrl('/login');
  }
}
