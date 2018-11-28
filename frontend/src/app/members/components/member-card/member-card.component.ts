import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
        <span>
          <h3>{{ member.firstName + " " + member.lastName }}</h3>
          <div *ngIf="member.isGrounded" class="badge badge-warning p-2">Grounded</div>
        </span>
        <button (click)="deleteMember()"><fa-icon [icon]="faTimes"></fa-icon></button>
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
  faTimes = faTimes;
  @Input()
  member: Child;

  @Output()
  edit = new EventEmitter<Child>();

  @Output()
  ground = new EventEmitter<Child>();

  @Output()
  delete = new EventEmitter<Child>();

  editMember() {
    this.edit.emit(this.member);
  }

  toggleGround() {
    this.ground.emit(this.member);
  }

  deleteMember() {
    this.delete.emit(this.member);
  }
}
