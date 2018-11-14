import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from 'src/domain/models/member';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Child } from 'src/domain/models/child';

@Injectable()
export class MembersService {
  constructor(protected httpClient: HttpClient) {}

  protected baseUrl =
    'http://ec2-18-222-217-233.us-east-2.compute.amazonaws.com:8080';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };

  addMember(member: Member): Observable<Member> {
    return this.httpClient
      .post<Member>(`${this.baseUrl}/users/${member.id}`, member, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  editMember(member: Member): Observable<Member | Child> {
    return this.httpClient
      .post<Member>(`${ this.baseUrl }/users/edit/${member.id}`, member, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  toggleGround(isGrounded: boolean, childId: number): Observable<Child> {
    const groundType: string = isGrounded ? 'unground' : 'ground';
    return this.httpClient
      .put<Child>(`${this.baseUrl}/childDetails/edit/${groundType}/${childId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
