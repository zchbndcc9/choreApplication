import { MemberGroundModalComponent } from './../components/member-ground-modal/member-ground-modal.component';
import { MembersService } from './../members.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberFormComponent } from '../components/member-form/member-form.component';
import { Member } from '../../../domain/models/member';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  parents$ = this.membersService.retrieve<Member[]>('parents');
  children$ = this.membersService.retrieve<Member[]>('children');

  constructor(
    private membersService: MembersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() { }

  addMember() {
    const modal = this.openMemberModal(new Member(), false);

    modal.result.then(newMember => {
      console.log(newMember);
      this.membersService.addMember(newMember);
    }).catch(error => {
      console.error(error);
    });
  }

  editMember(member: Member) {
    const modal = this.openMemberModal(member, true);

    modal.result.then(editedMember => {
      this.membersService.editMember(editedMember);
    }).catch(error => {
      console.error(error);
    });
  }

  groundMember(memberId: number) {
    const modal = this.openGroundModal();

    modal.result.then(result => {
      this.membersService.groundMember(memberId);
    });
  }

  openGroundModal() {
   return this.modalService.open(MemberGroundModalComponent);
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
