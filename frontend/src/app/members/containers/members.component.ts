import { MembersService } from './../members.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberFormComponent } from '../components/member-form/member-form.component';
import { Member } from '../../../domain/models/member';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';

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

  }

  openGroundModal(content, child: Member) {
    this.modalService.open(content, {ariaLabelledBy: 'groundModal'}).result.catch( error => {
      console.error(error);
    });
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
