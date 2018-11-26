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
    if (window.sessionStorage.getItem('userID') && window.sessionStorage.getItem('familyID')) {
      if (JSON.parse(window.sessionStorage.getItem('Success')) == true) {
        return true;
      }
    }
    return false;
  }
}
