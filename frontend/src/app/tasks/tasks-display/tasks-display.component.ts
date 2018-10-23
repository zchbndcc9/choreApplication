import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrls: ['./tasks-display.component.css']
})
export class TasksDisplayComponent implements OnInit {

  @Input() tasks: Task[];
  filteredTasks: Task[];
  filterBy: string;

  constructor() { }

  ngOnInit() {
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
