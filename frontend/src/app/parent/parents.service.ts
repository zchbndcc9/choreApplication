import { catchError, concatAll } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from './../../domain/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Child } from 'src/domain/models';

@Injectable()
export class ParentsService {
  constructor(protected httpClient: HttpClient) {}

  protected baseUrl =
    'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''
    })
  };

  getFamilyInfo(familyId: number): Observable<any> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/getfamilyInfo/${familyId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getUser(userID: number): Observable<any> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/users/${userID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getParents(familyId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/getParents/${familyId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getChildren(familyId: number): Observable<Child[]> {
    return this.httpClient.get<Child[]>(`${this.baseUrl}/getChildren/${familyId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
