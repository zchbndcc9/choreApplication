import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Task } from '../../domain/models';

@Injectable()
export class TaskService {

  protected endpoint = "http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080";

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  createTask(task: Task): Observable<Task> {
    return this.httpClient
      .post<Task>(this.endpoint + "/tasks/add", task, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  createTaskDetails(taskDetails: any): Observable<any> {
    return this.httpClient
      .post<any>(this.endpoint + "/taskDetails/add", taskDetails, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getUserTasks(userID: number): Observable<Task[]> {
    return this.httpClient
      .get<Task[]>(`${this.endpoint}/getTasks/${userID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getTask(userID: number, taskID: number): Observable<Task> {
    return this.httpClient
      .get<Task>(`${this.endpoint}/getTask/${userID}/${taskID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getTaskDetails(taskID: number): Observable<any> {
    return this.httpClient
      .get<any>(`${this.endpoint}/taskDetails/${taskID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient
      .put<Task>(`${this.endpoint}/tasks/edit/${task.taskID}`, task, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  editTaskDetails(taskID: number, taskDetails: any): Observable<any> {
    return this.httpClient
      .put<any>(`${this.endpoint}/taskDetails/edit/${taskID}`, taskDetails, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  deleteTask(taskID: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.endpoint}/tasks/delete/${taskID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  deleteTaskDetails(taskID: number): Observable<any> {
    return this.httpClient
      .delete<any>(`${this.endpoint}/taskDetails/delete/${taskID}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
