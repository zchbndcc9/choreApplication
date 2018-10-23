import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrls: ['./tasks-display.component.css']
})
export class TasksDisplayComponent implements OnInit {

  tasks: Task[];
  filteredTasks: Task[];
  filterBy: string;

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
    this.filterBy = 'all';
    this.filterTasks();
  }

  filterTasks() {
    if (this.filterBy === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.filterBy);
    }
  }

}
