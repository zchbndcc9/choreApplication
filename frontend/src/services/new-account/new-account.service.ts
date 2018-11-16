import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Family, Task, Member } from '../../domain/models';

@Injectable({
  providedIn: 'root'
})
export class NewAccountService {

  protected endpoint = 'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) { }

  createAccount(firstName: string, lastName: string, address1: string, address2: string, city: string, state: string, zip: string, email: string, password: string): Object {
    if (address2) {
      var address = `${address1} #${address2}, ${city}, ${state} ${zip}`;
    } else {
      var address = `${address1}, ${city}, ${state} ${zip}`;
    }
    let body = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      password: password
    }
    return this.httpClient.
      post<Object>(`${this.endpoint}/family/add`, body, this.httpOptions).
      pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
