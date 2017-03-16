import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {Registration} from "../registration/registration.model";
import {User} from "../models/user.model";

@Injectable()
export class AuthenticationService {
  userMap: {[key: string]: User} = {};
  constructor(private http: Http) { }

  register2(): boolean {
    //this.userMap[user.email] = user;
    return true;
  }

  register(user: User) {
    this.userMap[user.email] = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    //return false;
  }

  logout() {
    this.userMap = {};
    localStorage.removeItem('currentUser');
  }

  login(userName: string, password: string) {
    console.log(userName);
    return this.http.post('/api/authenticate', JSON.stringify({ userName: userName, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }
}
