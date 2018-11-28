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

  addMember(famID: number, member: Member): Observable<Member> {
    const req = {...member, familyID: famID};
    return this.httpClient
      .post<Member>(`${this.baseUrl}/familyMember/add`, req, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  editMember(famID: number, member: Member): Observable<Member | Child> {
    const req = {...member, familyID: famID };

    return this.httpClient
      .put<Member>(`${ this.baseUrl }/member/edit/${member.userID}`, req, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  deleteMember(memberId: Member): Observable<any> {
    return this.httpClient
      .delete(`${this.baseUrl}/users/delete/${memberId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  getMember(memberId: number): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/users/${memberId}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  toggleGround(isGrounded: boolean, childId: number) {
    const groundType: string = isGrounded ? 'unground' : 'ground';
    return this.httpClient
      .put<any>(`${this.baseUrl}/childDetails/edit/${groundType}/${+childId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
