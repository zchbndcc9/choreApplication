import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroundingAppealComponent } from '../grounding-appeal/grounding-appeal.component';
import { Task } from '../../domain/models';
import { TasksService } from 'src/services/tasks/tasks.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  userID = 1;
  isGrounded = true;
  tasks: Task[];

  constructor(private modalService: NgbModal, private TasksService: TasksService) { }

  ngOnInit() {
    this.TasksService.getUserTasks(this.userID).subscribe(results => {
      this.tasks = results;
    });
  }

  openGroundingAppealModal() {
    const modalRef = this.modalService.open(GroundingAppealComponent);
    modalRef.componentInstance.name = 'GroundingAppeal';
  }

}
