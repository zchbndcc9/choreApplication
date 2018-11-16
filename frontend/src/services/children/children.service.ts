import { Task } from '../../domain/models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from '../../domain/models/child';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

  getChildrenDetailed(familyId: number): Observable<Child[]> {
    return this.httpClient.get<Child[]>(`${this.baseUrl}/getChildren/${familyId}`, this.httpOptions).pipe(
      mergeMap((children, index) => this.httpClient
      .get<any>(`${this.baseUrl}/getTaskAmount/${children[index].userID}`, this.httpOptions), (oVal, iVal, oIndex) => {
          oVal[oIndex].tasks = iVal.count;
          return oVal;
      }),
      mergeMap((children, index) => this.httpClient
        .get<Number>(`${this.baseUrl}/getInfractionsAmount/${children[index].userID}`, this.httpOptions), (oVal, iVal, oIndex) => {
          oVal[oIndex].infractions = iVal;
          return oVal;
      })
    );
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
