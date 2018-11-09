import { Member } from 'src/domain/models/member';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Child } from 'src/domain/models/child';
export interface State {
  parents: Member[];
  children: Child[];
}

const state = {
  parents: [
    {id: 1, familyId: 1,  firstName: 'John', lastName: 'Doe', username: 'doeman', isParent: true},
    {id: 2, familyId: 1,  firstName: 'Jane', lastName: 'Doe', username: 'doewoman', isParent: true}
  ],
  children: [
    {id: 3, familyId: 1, firstName: 'Jimbo', lastName: 'Doe', username: 'doemango', isParent: false,
    isGrounded: false, rating: 5, tasks: [], infractions: []},
    {id: 4, familyId: 1, firstName: 'Janda', lastName: 'Doe', username: 'doewomfan',
    isParent: false, isGrounded: false, rating: 4, tasks: [], infractions: []}
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
    const type = member.isParent ? 'parents' : 'children';
    const prevState = this.subject.value;
    const memberIndex = prevState[type].findIndex(mem => mem.id === member.id);
    const newState = [
      ...prevState[type].slice(0, memberIndex),
      member,
      ...prevState[type].slice(memberIndex + 1)
    ];
    console.dir(newState);
    this.subject.next({...prevState, [type]: newState });
  }

  toggleGround(childId: number) {
    // API call
    const prevState = this.subject.value;
    const childIndex = prevState.children.findIndex(child => child.id === childId);
    const updatedChild  = { ...prevState.children[childIndex], isGrounded: !prevState.children[childIndex].isGrounded };
    const newState = [
      ...prevState.children.slice(0, childIndex),
      updatedChild,
      ...prevState.children.slice(childIndex + 1)
    ];
    this.subject.next({...prevState, children: newState });
  }

  retrieve<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }
}
