import { Task } from '../../domain/models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from '../../domain/models/child';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

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
    return this.httpClient.get<Child[]>(`${this.baseUrl}/getChildren/${familyId}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  getDetails(children: Child[]): Observable<Child> {
    return from(children).pipe(
      mergeMap(child => this.httpClient.get<any>(`${this.baseUrl}/getTaskAmount/${child.userID}`, this.httpOptions), (child, tasks) => {
          child.tasks = tasks.count;
          return child;
        }),
    mergeMap(child => this.httpClient.get<any>(`${this.baseUrl}/getInfractionsAmount/${child.userID}`, this.httpOptions), (child, infractions) => {
        child.infractions = infractions.count;
        return child;
      }),
      catchError(this.handleException)
    );
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
