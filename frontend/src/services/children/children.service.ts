import { Task } from '../../domain/models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from '../../domain/models/child';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

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

  getDetails(children: Child[]): Observable<any> {
    return from(children).pipe(
      mergeMap(child => this.httpClient.get<any>(`${this.baseUrl}/getTaskAmount/${child.userID}`, this.httpOptions), (child, tasks) => {
        child.tasks = tasks['count(taskID)'];
        return child;
      }),
      mergeMap(child => this.httpClient.get<any>(`${this.baseUrl}/getInfractionsAmount/${child.userID}`, this.httpOptions), (child, infractions) => {
        child.infractions = infractions['count(infracID)'];
        return child;
      }),
      mergeMap(child => this.httpClient.get<any>(`${this.baseUrl}/children/${child.userID}/avg-rating`, this.httpOptions), (child, rating) => {
        child.rating = rating['avg(TD.taskRating)'];
        return child;
      }),
      catchError(this.handleException)
    );
  }

  getChildDetails(childId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/childDetails/${childId}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  getChildAvgRating(childId: number): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/children/${childId}/avg-rating`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
