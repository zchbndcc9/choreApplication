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


  retrieveMember(memberId: number) {

  }

  addMember(member: Member) {

  }

  editMember(member: Member) {

  }

  toggleGround(isGrounded: boolean, childId: number) {
    const groundType: string = isGrounded ? 'unground' : 'ground';
    return this.httpClient.put<Child>(`${this.baseUrl}/childDetails/edit/${groundType}/${childId}`, this.httpOptions)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    return Observable.throw(exception);
  }
}
