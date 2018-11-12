import { Child } from 'src/domain/models/child';
import { Member } from 'src/domain/models/member';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-member-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./member-card.component.css'],
  template: `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h3>{{ member.firstName + " " + member.lastName }}</h3>
        <div *ngIf="member.isGrounded" class="badge badge-warning p-2">Grounded</div>
      </div>
      <div class="card-body">
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-primary" (click)="editMember()">Edit</button>
        <button [ngClass]="member.isGrounded ? 'btn btn-success' : 'btn btn-warning'"
          (click)="toggleGround()">
          {{ member.isGrounded ? "Unground" : "Ground" }}
        </button>
      </div>
    </div>`
})
export class MemberCardComponent {
  @Input()
  member: Child;

  @Output()
  edit = new EventEmitter<Child>();

  @Output()
  ground = new EventEmitter<Child>();

  editMember() {
    this.edit.emit(this.member);
  }

  toggleGround() {
    this.ground.emit(this.member);
  }
}
