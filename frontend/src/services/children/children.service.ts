import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from 'src/domain/models/child';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { toArray, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  protected baseUrl =
    'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(protected httpClient: HttpClient) {}

  getChildren(familyId: number): Observable<Child[]> {
    return this.httpClient.get<Child[]>(`${this.baseUrl}/getChildren/${familyId}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
