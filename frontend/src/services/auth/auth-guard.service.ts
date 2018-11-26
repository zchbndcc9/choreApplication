import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from './../../domain/models/member';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router, private httpClient: HttpClient) {
  }

  protected baseUrl =
    'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

    protected httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ''
      })
    };

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //if the username and password matches something in the database
    if (this._authService.isAuthenticated()) {
      //get the userID they used to sign in
      let userID = sessionStorage.getItem('userID');
      let familyID = sessionStorage.getItem('familyID');
      this.getUserDetails(JSON.parse(userID)).subscribe(result => {
        console.log(result);
        //if they are a child
        if (JSON.parse(result.userType)==0) {
          //check if the stored userID matches the id of the page they are trying to navigate to
          if (userID==next.params['id']) {
            return true;
          }
          else {
            return false;
          }
        }
        //if they are a parent
        else {
          //check if the stored familyID matches the id of the family page they are trying to hit
          //the second condition ensures that children cannot view their family page
          if (familyID==next.params['id'] && (JSON.parse(window.sessionStorage.getItem('userType'))==1)) {
            return true;
          }
          else {
            return false;
          }
        }
      })
      return false;
    }
    console.log('navigate to login page');
    this._router.navigate(['/login']);
    return false;
  }

  getUserDetails(userID: number): Observable<any> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/userDetails/${userID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
