import { ParentGroundModalComponent } from './../../parent/components/parent-ground-modal/parent-ground-modal.component';
import { ParentsService } from './../../parent/parents.service';
import { TasksService } from './../../../services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from './../../../services/children/children.service';
import { Child } from './../../../domain/models/child';
import { MembersService } from './../members.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberFormComponent } from '../components/member-form/member-form.component';
import { Member } from '../../../domain/models/member';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  parents: Member[];
  children: Child[];
  famID: number;

  constructor(
    protected membersService: MembersService,
    protected childrenService: ChildrenService,
    protected parentsService: ParentsService,
    protected tasksService: TasksService,
    protected route: ActivatedRoute,
    protected modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.children = [];
    this.route.params.subscribe(params => {
      this.famID = params['id'];
      this.parentsService.getParents(this.famID).subscribe(_parents => this.parents = _parents );
      this.childrenService.getChildren(this.famID).subscribe(children => {
        this.childrenService.getDetails(children).subscribe(child => {
          this.children.push(child);
        });
      });
    });
  }

  addMember() {
    const modal = this.openMemberModal(new Member(), false);

    modal.result.then((newMember: Member) => {
      this.membersService.addMember(this.famID, newMember).subscribe(_newMember => {
        console.dir(_newMember);
        const type = _newMember.isParent ? this.parents : this.children;
        type.push(_newMember);
      });
    }).catch(error => {
      console.error(error);
    });
  }

  editMember({member, index}) {
    const modal = this.openMemberModal(member, true);

    modal.result.then(updates => {
      const editedMember = {...member, ...updates };
      this.membersService.editMember(editedMember).subscribe((_member: Member) => {
        console.log(_member);
        if (_member.isParent) {
          this.parents[index] = { ...this.parents[index], ..._member };
        } else {
          this.children[index] = {...this.children[index], ..._member };
        }
      });
    }).catch(error => {
      console.error(error);
    });
  }

  toggleGround({child, index}) {
    if (!child.isGrounded) {
      // Confirm grounding
      const modal = this.openGroundModal();
      // Submits request if parent confirms
      modal.result.then(result => {
        this.membersService.toggleGround(child.isGrounded, child.userID).subscribe(ground => {
          this.children[index].isGrounded = !this.children[index].isGrounded;
        });
      });
    } else {
      // Unground child
      this.membersService.toggleGround(child.isGrounded, child.userID).subscribe(ground => {
        this.children[index].isGrounded = !this.children[index].isGrounded;
      });
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
    return member.userID;
  }
}

