import { Child } from 'src/domain/models/child';
import { Member } from '../../../../domain/models/member';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-member-cardlist',
  styleUrls: ['./member-cardlist.component.css'],
  template: `
    <div class="card-columns">
      <ng-container *ngFor="let member of members; let i = index; trackBy: retrieveId">
        <app-member-card
          [member]="member"
          (ground)="toggleGround($event)"
          (edit)="editMember($event, i)"></app-member-card>
      </ng-container>
    </div>
  `
})

export class MemberCardlistComponent {

  @Input()
  members: Child[];

  @Output()
  edit = new EventEmitter<any>();

  @Output()
  ground = new EventEmitter<Child>();

  retrieveId(index: number, member: Member) {
    return member.userID;
  }

  editMember(child: Child, index: number) {
    const pair: any = { child, index };
    this.edit.emit(pair);
  }

  toggleGround(child: Child) {
    this.ground.emit(child);
  }

}
