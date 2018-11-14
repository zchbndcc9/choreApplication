import { Task } from '../../domain/models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from '../../domain/models/child';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, from, of } from 'rxjs';
import { map, mergeMap, catchError, toArray } from 'rxjs/operators';

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
      mergeMap((children) => {
        return forkJoin(
          from(children).pipe(
            mergeMap((child) => {
              return this.httpClient.get<Task[]>(`${this.baseUrl}/getTasks/${child.id}`, this.httpOptions).pipe(
                map((tasks: Task[]) => {
                  child.tasks = tasks;
                  return child;
                })
              );
            })
          )
        );
      })
    );
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
