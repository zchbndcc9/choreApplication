import { Member } from './../../../../domain/models/member';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-cardlist',
  styleUrls: ['./member-cardlist.component.css'],
  template: `
    <div class="card-columns">
      <ng-container *ngFor="let member of members">
        <app-member-card [member]="member"></app-member-card>
      </ng-container>
    </div>
  `
})

export class MemberCardlistComponent {

  @Input()
  members: Member[];

  retrieveId(member: Member) {
    return member.id;
  }

}
