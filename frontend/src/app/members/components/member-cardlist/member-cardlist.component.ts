import { Member } from './../../../../domain/models/member';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-member-cardlist',
  styleUrls: ['./member-cardlist.component.css'],
  template: `
    <div class="card-columns">
      <ng-container *ngFor="let member of members; trackBy: retrieveId">
        <app-member-card
          [member]="member"
          (toggleGround)="toggleGround($event)"
          (edit)="editMember($event)"></app-member-card>
      </ng-container>
    </div>
  `
})

export class MemberCardlistComponent {

  @Input()
  members: Member[];

  @Output()
  edit = new EventEmitter<Member>();

  @Output()
  ground = new EventEmitter<Member>();

  retrieveId(index: number, member: Member) {
    return member.id;
  }

  editMember(member: Member) {
    this.edit.emit(member);
  }

  toggleGround(child: Member) {
    this.ground.emit(child);
  }

}
