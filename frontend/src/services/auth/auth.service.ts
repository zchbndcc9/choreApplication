import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _loginService: LoginService
  ) { }

  isAuthenticated(): boolean {
    if (window.localStorage.getItem('userID') && window.localStorage.getItem('familyID')) {
      if (JSON.parse(window.localStorage.getItem('Success')) == true) {
        return true;
      }
    }
    return false;
  }
}
