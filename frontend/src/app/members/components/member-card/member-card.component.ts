import { Member } from 'src/domain/models/member';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-member-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./member-card.component.css'],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h3>{{ member.firstName + " " + member.lastName }}</h3>
      </div>
      <div class="card-body">
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-primary" (click)="editMember()">Edit</button>
        <button class="btn btn-warning" (click)="groundMember()">Ground</button>
      </div>
    </div>`,
})
export class MemberCardComponent {

  @Input()
  member: Member;

  @Output()
  edit = new EventEmitter<Member>();

  @Output()
  ground = new EventEmitter<number>();

  editMember() {
    this.edit.emit(this.member);
  }

  groundMember() {
    this.ground.emit(this.member.id);
  }
}
