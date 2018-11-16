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
    const req = {...member, familyID: famID, userType: member.isParent ? '1' : '0'};
    return this.httpClient
      .post<Member>(`${this.baseUrl}/familyMember/add`, req, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  editMember(member: Member): Observable<Member | Child> {
    return this.httpClient
      .put<Member>(`${ this.baseUrl }/users/edit/${member.userID}`, member, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

<<<<<<< HEAD
  editMember(member: Member) {
    const type = member.isParent ? 'parents' : 'children';
    const prevState = this.subject.value;
    // const memberIndex = prevState[type].findIndex(mem => mem.id === member.id);
    const newState = [
      // ...prevState[type].slice(0, memberIndex),
      member,
      // ...prevState[type].slice(memberIndex + 1)
    ];
    console.dir(newState);
    this.subject.next({...prevState, [type]: newState });
  }

  toggleGround(isGrounded: boolean, childId: number) {
=======
  toggleGround(isGrounded: boolean, childId: number): Observable<Child> {
>>>>>>> 44f9b0f5f326dd399503477846c151b092f7cf23
    const groundType: string = isGrounded ? 'unground' : 'ground';
    return this.httpClient
      .put<Child>(`${this.baseUrl}/childDetails/edit/${groundType}/${+childId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
