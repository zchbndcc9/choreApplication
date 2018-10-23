import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  tasks: Task[];

  constructor() { }

  ngOnInit() {
    this.tasks = [
      {
        title: 'CLEAN THE KITCHEN',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh'
      },
      {
        title: 'MOW THE LAWN',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh'
      },
      {
        title: 'HELP SISTER WITH HOMEWORK',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh'
      },
      {
        title: 'CLEAN THE KITCHEN',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh'
      },
      {
        title: 'MOW THE LAWN',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh'
      },
      {
        title: 'HELP SISTER WITH HOMEWORK',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh'
      },
      {
        title: 'CLEAN THE KITCHEN',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh'
      },
      {
        title: 'MOW THE LAWN',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh'
      },
      {
        title: 'HELP SISTER WITH HOMEWORK',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh'
      }
    ];
  }

}
