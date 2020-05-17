import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userToken: string;
  private listUsers: User[];

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('currentUser');
  }

  getUserToken(): string {
    return this.userToken;

  }

  login(username, password) {
    return this.http.post<any>(`api/users`, { username, password })
      .pipe(map(data => {
        localStorage.setItem('currentUser', data.token);
        return data.token ;
      }))
  }

  deleteUser(id:number): Observable<{}> {
    return this.http.delete<any>(`api/users/${id}`)
      .pipe(map(data => {
        this.listUsers = new BehaviorSubject<User[]>(data).value;
        return data;
      }));
  }

  getUserData() {
    return this.http.get<any>(`api/users`)
      .pipe(map(data => {
        let user = new User();
        user.id = data.id;
        user.username = data.username;
        user.role = data.role;
        let userBehavior = new BehaviorSubject<User>(data);
        if (data.role == "admin") {
          this.listUsers = data.users;
        }
        return userBehavior;
      }));
  }

  getListUsers() {
    return this.listUsers;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
  }
}
