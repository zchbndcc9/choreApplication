import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../domain/models';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrls: ['./tasks-display.component.css']
})
export class TasksDisplayComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;

  @Input() tasks: Task[];
  filteredTasks: Task[];
  filterBy: string;

  constructor() { }

  ngOnInit() {
    this.filterBy = 'all';
    this.filterTasks();
  }

  filterTasks() {
    if (!this.tasks) {
      this.tasks = [];
      this.filteredTasks = [];
    }
    else if (this.filterBy === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.filterBy === 'overdue') {
      this.filteredTasks = this.tasks.filter(task => !this.isWithinDeadline(task.deadline));
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status === this.filterBy);
    }

    this.filteredTasks = this.filteredTasks.sort((t1, t2) => {
      if (t1.taskTitle < t2.taskTitle) {
        return -1;
      }
      if (t1.taskTitle > t2.taskTitle) {
        return 1;
      }
      return 0;
    });
  }

  isWithinDeadline(deadline) {
    return deadline > new Date();
  }
}
