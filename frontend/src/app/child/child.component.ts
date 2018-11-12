import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroundingAppealComponent } from '../grounding-appeal/grounding-appeal.component';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  isGrounded = true;
  tasks: Task[];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.tasks = [
      {
        title: 'CLEAN THE KITCHEN',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-10-17')
      },
      {
        title: 'MOW THE LAWN',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh',
        deadline: new Date('2018-10-05')
      },
      {
        title: 'HELP SISTER WITH HOMEWORK',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-02')
      },
      {
        title: 'COMPLETE HOMEWORK',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-17')
      },
      {
        title: 'DO THE LAUNDRY',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh',
        deadline: new Date('2018-09-10')
      },
      {
        title: 'RANDOM CHORE',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-01')
      },
      {
        title: 'RANDOM CHORE',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-11')
      },
      {
        title: 'WALK THE DOGS',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh',
        deadline: new Date('2018-11-17')
      },
      {
        title: 'SWEEP THE GARAGE',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-08-22')
      }
    ];
  }

  openGroundingAppealModal() {
    const modalRef = this.modalService.open(GroundingAppealComponent);
    modalRef.componentInstance.name = 'GroundingAppeal';
  }

}
