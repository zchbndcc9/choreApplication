import { Child } from 'src/domain/models/child';
import { Member } from '../../../../domain/models/member';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "app-member-cardlist",
  styleUrls: ["./member-cardlist.component.css"],
  template: `
    <div class="card-columns">
      <ng-container
        *ngFor="let member of members; let i = index; trackBy: retrieveId"
      >
        <app-member-card
          [member]="member"
          (ground)="toggleGround($event, i)"
          (edit)="editMember($event, i)"
          (tasks)="viewTasks($event)"
          (delete)="deleteMember($event, i)"
        ></app-member-card>
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
  ground = new EventEmitter<any>();

  @Output()
  tasks = new EventEmitter<number>();

  @Output()
  delete = new EventEmitter<any>();

  retrieveId(index: number, member: Member) {
    return member.userID;
  }

  editMember(member: Child, index: number) {
    const pair: any = { member, index };
    this.edit.emit(pair);
  }

  toggleGround(child: Child, index: number) {
    const pair: any = { child, index };
    this.ground.emit(pair);
  }

  viewTasks(memberId: number) {
    this.tasks.emit(memberId);
  }

  deleteMember(member: Child, index: number) {
    const pair: any = { member, index };
    this.delete.emit(pair);
  }
}
