import { Member } from 'src/domain/models/member';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
export interface State {
  parents: Member[];
  children: Member[];
}

const state = {
  parents: [
    {id: 1, familyId: 1,  firstName: 'John', lastName: 'Doe', username: 'doeman', isParent: true},
    {id: 2, familyId: 1,  firstName: 'Jane', lastName: 'Doe', username: 'doewoman', isParent: true}
  ],
  children: [
    {id: 3, familyId: 1, firstName: 'Jimbo', lastName: 'Doe', username: 'doemango', isParent: false, grounded: false },
    {id: 4, familyId: 1, firstName: 'Janda', lastName: 'Doe', username: 'doewomfan', isParent: false, grounded: false}
  ]
};

@Injectable()
export class MembersService {

  private subject = new BehaviorSubject<State>(state);
  store = this.subject.asObservable();

  constructor() {}

  retrieveMember(memberId: number) {

  }

  addMember(member: Member) {
    // API call
    const type = member.isParent ? 'parents' : 'children';
    const prevState = this.subject.value;
    this.subject.next({...prevState, [type]: [...prevState[type], member]});
  }

  editMember(member: Member) {

  }

  toggleGround(memberId: number) {
    // API call
    const prevState = this.subject.value;
    const childIndex = prevState.children.findIndex(child => child.id === memberId);
    const updatedMember  = { ...prevState.children[childIndex], grounded: !prevState.children[childIndex].grounded }
    const newState = [
      ...prevState.children.slice(0, childIndex),
      updatedMember,
      ...prevState.children.slice(childIndex + 1)
    ];
    this.subject.next({...prevState, children: newState });
  }

  retrieve<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }
}
