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
  parents$ = this.membersService.retrieve<Member>('parents');
  children$ = this.membersService.retrieve<Member>('children');

  constructor(
    private membersService: MembersService,
    private modalService: NgbModal
  ) {}

  ngOnInit() { }

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
