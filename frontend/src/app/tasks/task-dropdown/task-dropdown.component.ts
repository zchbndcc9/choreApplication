import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-dropdown',
  templateUrl: './task-dropdown.component.html',
  styleUrls: ['./task-dropdown.component.css']
})
export class TaskDropdownComponent implements OnInit {

  task: Task;

  constructor() { }

  ngOnInit() {
    this.task = {
      title: 'CLEAN THE KITCHEN',
      description: 'Wash the dishes, clean the oven, and empty the dishwasher',
      status: 'incomplete',
      assignedBy: 'Rebecca Oh'
    };
  }

}
