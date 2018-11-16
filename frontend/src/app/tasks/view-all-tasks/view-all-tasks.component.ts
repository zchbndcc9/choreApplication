import { Component, OnInit } from '@angular/core';
import { Task } from '../../../domain/models/task';

@Component({
  selector: 'app-view-all-tasks',
  templateUrl: './view-all-tasks.component.html',
  styleUrls: ['./view-all-tasks.component.css']
})
export class ViewAllTasksComponent implements OnInit {

  tasks: Task[];

  constructor() { }

  ngOnInit() {
    this.tasks = [
      {
        id: 1,
        title: 'CLEAN THE KITCHEN',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-10-17'),
        award: 'love',
        notified: false
      },
      {
        id: 2,
        title: 'MOW THE LAWN',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh',
        deadline: new Date('2018-10-05'),
        award: 'hate',
        notified: true
      },
      {
        id: 3,
        title: 'HELP SISTER WITH HOMEWORK',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-02'),
        award: 'fear',
        notified: false
      },
      {
        id: 4,
        title: 'COMPLETE HOMEWORK',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-17'),
        award: 'respect',
        notified: true
      },
      {
        id: 5,
        title: 'DO THE LAUNDRY',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh',
        deadline: new Date('2018-09-10'),
        award: 'nothing',
        notified: false
      },
      {
        id: 6,
        title: 'RANDOM CHORE',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-01'),
        award: 'pain',
        notified: true
      },
      {
        id: 7,
        title: 'RANDOM CHORE',
        description: 'Wash the dishes, clean the oven, and empty the dishwasher',
        status: 'incomplete',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-12-11'),
        award: 'fame',
        notified: false
      },
      {
        id: 8,
        title: 'WALK THE DOGS',
        description: 'Cut the grass, clean up the clippings',
        status: 'rejected',
        assignedBy: 'Josh Oh',
        deadline: new Date('2018-11-17'),
        award: 'fortune',
        notified: true
      },
      {
        id: 9,
        title: 'SWEEP THE GARAGE',
        description: 'Help with math, reading, and writing',
        status: 'pending',
        assignedBy: 'Rebecca Oh',
        deadline: new Date('2018-08-22'),
        award: 'glory',
        notified: false
      }
    ];
  }

}
