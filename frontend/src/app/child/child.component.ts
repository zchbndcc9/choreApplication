import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroundingAppealComponent } from '../grounding-appeal/grounding-appeal.component';
import { Task, Child } from '../../domain/models';
import { TasksService } from 'src/services/tasks/tasks.service';
import { MembersService } from '../members/members.service';
import { ChildrenService } from 'src/services/children/children.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  userID: number;
  child: Child;
  isGrounded = true;
  tasks: Task[];

  constructor(private modalService: NgbModal,
              private tasksService: TasksService,
              private memberService: MembersService,
              private childrenService: ChildrenService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.params['id'];
    this.loadChild();
  }

  loadChild() {
    this.memberService.getMember(this.userID).subscribe(childInfo => {
      this.child = childInfo;
      this.childrenService.getChildDetails(this.userID).subscribe(childDetails => {
        this.child.rating = +childDetails.rating;
        this.child.isGrounded = !!+childDetails.groundedStatus;
        this.tasksService.getUserTasks(this.userID).subscribe(childTasks => {
          this.child.tasks = childTasks;
        });
      });
    });
  }

  openGroundingAppealModal() {
    const modalRef = this.modalService.open(GroundingAppealComponent);
    modalRef.componentInstance.name = 'GroundingAppeal';
  }

}
