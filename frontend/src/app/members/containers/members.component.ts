import { MemberDeleteModalComponent } from './../components/member-delete-modal/member-delete-modal.component';
import { ParentGroundModalComponent } from './../../parent/components/parent-ground-modal/parent-ground-modal.component';
import { ParentsService } from './../../parent/parents.service';
import { TasksService } from './../../../services/tasks/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildrenService } from './../../../services/children/children.service';
import { Child } from './../../../domain/models/child';
import { MembersService } from './../members.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberFormComponent } from '../components/member-form/member-form.component';
import { Member } from '../../../domain/models/member';
import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  faTimes = faTimes;
  parents: Member[];
  children: Child[];
  famID: number;
  isLoading: boolean;

  constructor(
    protected membersService: MembersService,
    protected childrenService: ChildrenService,
    protected parentsService: ParentsService,
    protected tasksService: TasksService,
    protected route: ActivatedRoute,
    protected modalService: NgbModal,
    protected router: Router
  ) {}

  ngOnInit() {
    this.children = [];
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.famID = params['id'];
      this.parentsService.getParents(this.famID).subscribe(_parents => this.parents = _parents );
      this.childrenService.getChildren(this.famID).subscribe(children => {
        this.childrenService.getDetails(children).subscribe(child => {
          child = {...child, isGrounded: !!+child.groundedStatus, userType: +child.userType};
          // Code src:
          // https://blog.angularindepth.com/practical-rxjs-in-the-wild-requests-with-concatmap-vs-mergemap-vs-forkjoin-11e5b2efe293
          this.children.push(child);
          this.children.sort((a: Child, b: Child) => {
            const aIndex = children.findIndex(_child => _child.userID === a.userID);
            const bIndex = children.findIndex(_child => _child.userID === b.userID);
            return aIndex - bIndex;
          });
        }, error => console.log(error),
        () => this.isLoading = false);
      });
    });
  }

  addMember() {
    const modal = this.openMemberModal(new Member(), false);

    modal.result.then((newMember: Member | Child) => {
      this.membersService.addMember(this.famID, newMember).subscribe(_newMember => {

        newMember = {..._newMember, userType: +newMember.userType};
        if (!newMember.userType) {
          newMember = {...newMember, tasks: 0, rating: null};
        }
        const type = newMember.userType ? this.parents : this.children;
        type.push(newMember);
      });
    }, dismiss => {});
  }

  editMember({member, index}) {
    console.dir(member, index);
    const modal = this.openMemberModal(member, true);

    modal.result.then(updates => {
      const editedMember = {...member, ...updates };
      this.membersService.editMember(this.famID, editedMember).subscribe(() => {
        if (editedMember.userType) {
          this.parents[index] = editedMember;
        } else {
          this.children[index] = editedMember;
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
        this.membersService.toggleGround(child.isGrounded, child.userID).subscribe(() => {
          this.children[index] = {...child, isGrounded: !child.isGrounded};
        });
      });
    } else {
      // Unground child
      this.membersService.toggleGround(child.isGrounded, child.userID).subscribe(() => {
        this.children[index] = {...child, isGrounded: !child.isGrounded };
      });
    }
    console.log(this.children[index].isGrounded);
  }

  viewTasks(memberId: number) {
    this.router.navigateByUrl(`/family/${this.famID}/tasks`);
  }

  deleteMember({member, index}) {
    const modal = this.openDeleteModal();

    modal.result.then(result => {
      this.membersService.deleteMember(member.userID).subscribe(() => {
        if (member.userType) {
          this.parents.splice(index, 1);
        } else {
          this.children.splice(index, 1);
        }
      });
    }, dismissal => {}).catch(error => {
      console.error(error);
    });
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

  openDeleteModal() {
    return this.modalService.open(MemberDeleteModalComponent);
  }

  retrieveID(index: number, member: Member) {
    return member.userID;
  }
}

