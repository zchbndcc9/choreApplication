import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Member } from './../domain/models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersRepo {

  protected endPoint = 'https://172-31-29-2:8080';
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'zachbanducci'
    })
  };

  constructor(protected httpClient: HttpClient) {}

  getById(id: number): Observable<Member> {
    
  }

  getAll(famId: number): Observable<Member> {

  }

  add(newMember: Member): Observable<Member> {

  }
}
