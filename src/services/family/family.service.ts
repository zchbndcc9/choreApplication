import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  protected endpoint = 'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  getInfo(familyID: number) {
    return this.httpClient.
      get<any>(`${this.endpoint}/getfamilyInfo/${familyID}`, this.httpOptions).
      pipe(catchError(this.handleException));
  }

  getUser(userID: number) {
    return this.httpClient.
      get<any>(`${this.endpoint}/users/${userID}`, this.httpOptions).
      pipe(catchError(this.handleException));
  }

  updateInfo(familyID: number, address: string, email: string, phone: string, registrationDate: string) {
    let body = {
      'address': address,
      'email': email,
      'phone': phone,
      'registrationDate': registrationDate
    };
    return this.httpClient.
      put<any>(`${this.endpoint}/familyInfo/edit/${familyID}`, body, this.httpOptions).
      pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
