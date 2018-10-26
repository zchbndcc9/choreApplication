import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberFormComponent } from './../member-form/member-form.component';
import { Member } from './../../domain/models/member';

import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';

@Component({
  selector: 'app-family-members',
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.css']
})
export class FamilyMembersComponent implements OnInit {
  MEMBERS: Member[];
  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.MEMBERS = [];
    for (let i = 0; i < 6; i++) {
      this.MEMBERS.push({
        id: i + 1,
        familyId: 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        isParent: faker.random.boolean()
      });
    }
  }

  editFam(member: Member) {
    const modalRef = this.modalService.open(MemberFormComponent);
    modalRef.componentInstance.member = member;
    modalRef.componentInstance.alreadyMember = true;

    modalRef.result.catch(error => {
      console.error(error);
    });
  }

  openGroundModal(content, child: Member) {
    this.modalService.open(content, {ariaLabelledBy: 'groundModal'}).result.catch( error => {
      console.error(error);
    });
  }

  retrieveID(index: number, member: Member) {
    return member.id;
  }
}
