import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from './../../domain/models/member';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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

  getParents(familyId: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/getParents/${familyId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
