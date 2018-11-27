import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/domain/models';
import { TasksService } from 'src/services/tasks/tasks.service';
import { MembersService } from 'src/app/members/members.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  tasks: Task[];
  isDataAvailable: boolean = false;

  constructor(private tasksService: TasksService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.tasksService
      .getUserTasks(this.activatedRoute.snapshot.params['id'])
      .subscribe((results) => {
        this.tasks = results;
        this.isDataAvailable = true;
      });
  }

}
