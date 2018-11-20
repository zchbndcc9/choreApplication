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
        <div class="d-flex justify-content-around">
          <div class="d-flex flex-column align-items-center">
            <div class="h4">Tasks</div>
            <a class="h6" (click)="viewTasks()">{{ member.tasks }}</a>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div class="h4">Infractions</div>
          <a class="h6" (click)="viewInfractions()">{{ member.infractions }}</a>
        </div>
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
  ground = new EventEmitter<Child>();
  tasks = new EventEmitter<number>();
  infractions = new EventEmitter<number>();

  editMember() {
    this.edit.emit(this.member);
  }

  toggleGround() {
    this.ground.emit(this.member);
  }

  viewTasks() {
    this.tasks.emit(this.member.userID);
  }

  viewInfractions() {
    this.infractions.emit(this.member.userID);
  }
}
