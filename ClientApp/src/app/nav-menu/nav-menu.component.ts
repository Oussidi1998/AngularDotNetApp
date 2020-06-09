import { Component } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  currentUser: User;

  constructor(
    public router: Router,
    private AuthService: AuthService
  ) {
    if (AuthService.getUserToken() !== null) {
      this.AuthService.getUserData().subscribe(x => this.currentUser = x.value);
    }
  }

  logout() {
    this.AuthService.logout();
    this.router.navigateByUrl('/login');

  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
