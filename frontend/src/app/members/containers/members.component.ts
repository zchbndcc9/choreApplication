import { Child } from './../../../domain/models/child';
import { ParentGroundModalComponent } from './../../parent/components/parent-ground-modal/parent-ground-modal.component';
import { MembersService } from './../members.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberFormComponent } from '../components/member-form/member-form.component';
import { Member } from '../../../domain/models/member';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  parents$ = this.membersService.retrieve<Member[]>('parents');
  children$ = this.membersService.retrieve<Child[]>('children');

  constructor(
    protected membersService: MembersService,
    protected modalService: NgbModal,
  ) {}

  ngOnInit() {}

  addMember() {
    const modal = this.openMemberModal(new Member(), false);

    modal.result.then(newMember => {
      this.membersService.addMember(newMember);
    }).catch(error => {
      console.error(error);
    });
  }

  editMember(member: Member) {
    const modal = this.openMemberModal(member, true);

    modal.result.then(updates => {
      const editedMember = {...member, ...updates };
      this.membersService.editMember(editedMember);
    }).catch(error => {
      console.error(error);
    });
  }

  toggleGround(child: Child) {
    if (!child.isGrounded) {
      // Confirm grounding
      const modal = this.openGroundModal();
      // Submits request if parent confirms
      modal.result.then(result => {
        this.membersService.toggleGround(child.isGrounded, child.id);
      });
    } else {
      // Unground child
      this.membersService.toggleGround(child.isGrounded, child.id);
    }
  }

  openGroundModal() {
   return this.modalService.open(ParentGroundModalComponent);
  }

  openMemberModal(member: Member, alreadyMember: boolean) {
    const modalRef = this.modalService.open(MemberFormComponent);
    modalRef.componentInstance.member = member;
    modalRef.componentInstance.alreadyMember = alreadyMember;

    return modalRef;
  }

  retrieveID(index: number, member: Member) {
    return member.id;
  }
}
