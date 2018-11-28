import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Task } from '../../../domain/models';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { TasksService } from 'src/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks-display',
  templateUrl: './tasks-display.component.html',
  styleUrls: ['./tasks-display.component.css']
})
export class TasksDisplayComponent implements OnInit {
  faExclamationTriangle = faExclamationTriangle;

  @Input() tasks: Task[];

  userType = +JSON.parse(window.sessionStorage.getItem('userType'));

  filteredTasks: Task[];
  filterBy: string;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.filterBy = 'all';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterBy = 'all';
    if (this.tasks) {
      this.filterTasks();
      console.log(this.tasks);
    }
  }

  filterTasks() {
    if (this.filterBy === 'all') {
      this.filteredTasks = this.tasks;
    } else if (this.filterBy === 'overdue') {
      this.filteredTasks = this.tasks.filter(task => !this.isWithinDeadline(task.deadline));
    } else {
      this.filteredTasks = this.tasks.filter(task => task.status.toLowerCase() === this.filterBy);
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
    return new Date(deadline) > new Date();
  }

  submitTaskForApproval(task: Task) {
    task.status = 'pending';
    this.tasksService.editTask(task).subscribe((result) => {});
  }

  approveTask(task: Task) {
    task.status = 'complete';
    this.tasksService.editTask(task).subscribe((result) => {});
  }

  rejectTask(task: Task) {
    task.status = 'rejected';
    task.taskRating = 0;
    this.tasksService.editTask(task).subscribe((result) => {});
  }

  deleteTask(taskID: number) {
    this.tasksService.deleteTask(taskID).subscribe((result) => {
      this.tasks = this.tasks.filter(task => task.taskID != taskID);
      this.filterTasks();
    });
  }
}
