import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/domain/models';
import { TasksService } from 'src/services/tasks/tasks.service';
import { MembersService } from 'src/app/members/members.service';
import { ParentsService } from 'src/app/parent/parents.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  tasks: Task[];
  isDataAvailable: boolean = false;

  familyInfo: any;
  user: any;

  familyID = +JSON.parse(window.sessionStorage.getItem('familyID'));
  userID = +JSON.parse(window.sessionStorage.getItem('userID'));

  userType = +JSON.parse(window.sessionStorage.getItem('userType'));

  constructor(private tasksService: TasksService,
              private parentsService: ParentsService) { }

  ngOnInit() {
    this.getFamilyInfo();
    this.getUser();
    this.getTasks();
  }

  getTasks() {
    if (this.userType == 1) {
      this.tasksService
      .getFamilyTasks(this.familyID)
      .subscribe((results) => {
        this.tasks = results;
        this.isDataAvailable = true;
      });
    }
    else {
      this.tasksService
      .getUserTasks(this.userID)
      .subscribe((results) => {
        this.tasks = results;
        this.isDataAvailable = true;
      });
    }
  }

  getFamilyInfo() {
    this.parentsService.getFamilyInfo(this.familyID).subscribe(result => {
      this.familyInfo = result;
    });
  }

  getUser() {
    this.parentsService.getUser(this.userID).subscribe(result => {
      this.user = result;
    })
  }

}
