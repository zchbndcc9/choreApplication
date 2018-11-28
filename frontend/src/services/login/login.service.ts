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

  login(email: string, password: string): Observable<any> {
    let body = {
      username: email,
      password: password
    }
    return this.httpClient.
    post<any>(`${this.endpoint}/login`, body, this.httpOptions).
    pipe(catchError(this.handleException));
  }

  getUserDetails(userID: number): Observable<any> {
    return this.httpClient.get<Member[]>(`${this.endpoint}/userDetails/${userID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }






}
