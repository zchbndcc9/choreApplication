import { Member } from 'src/domain/models/member';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

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
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-warning">Ground</button>
      </div>
    </div>`,
})
export class MemberCardComponent implements OnInit {

  @Input()
  member: Member;

  constructor() { }

  ngOnInit() {
  }

}
