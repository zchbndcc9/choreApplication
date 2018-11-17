import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Task } from 'src/domain/models';
import { TasksService } from 'src/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.tasksService
      .getUserTasks(this.activatedRoute.snapshot.params['id'])
      .subscribe((results) => {
        this.tasks = results;
      })

    // this.tasks = this.activatedRoute.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.tasksService.getUserTasks(+params.get('familyID')))
    // );
  }

}
