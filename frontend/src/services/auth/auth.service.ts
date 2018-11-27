import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
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
