import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Family, Task, Member } from '../../domain/models';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  protected endpoint = 'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  login(email: string, password: string): Object {
    let result = this.httpClient.
    get<Object>(`${this.endpoint}/${email}/${password}`).
    pipe(catchError(this.handleException));
    if (result.success === true) {
      //return an object with true and the token
    }
    else {
      //return an object with false and no token
    }
    //this is just a placeholder for now
    return {};
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }






}
