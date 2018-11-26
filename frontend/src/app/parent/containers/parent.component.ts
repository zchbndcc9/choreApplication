import { NewTaskFormComponent } from '../../tasks/new-task-form/new-task-form.component';
import { faUsers, faPlus, faClipboardCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { MemberFormComponent } from '../../members/components/member-form/member-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/services/tasks/tasks.service';
import { Task, Member } from 'src/domain/models';
import { ParentsService } from '../parents.service';
import { ChildrenService } from 'src/services/children/children.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  faUsers = faUsers;
  faClipboardCheck = faClipboardCheck;
  faPlus = faPlus;
  faWindowClose = faWindowClose;

  familyID = 3;
  parentID = 3;

  tasks: Task[];
  members: Member[];
  familyInfo: any;

  numCompletedTasks: number = 0;

  constructor(private modalService: NgbModal,
              private tasksService: TasksService,
              private parentsService: ParentsService) { }

  ngOnInit() {
    this.getFamilyInfo();
    this.getFamilyMembers();
    this.getFamilyTasks();
  }

  getFamilyInfo() {
    this.parentsService.getFamilyInfo(this.familyID).subscribe(result => {
      this.familyInfo = result;
    })
  }

  getFamilyMembers() {
    forkJoin([this.parentsService.getParents(this.familyID), this.parentsService.getChildren(this.familyID)]).subscribe(results => {
      let parents = results[0];
      let children = results[1];
      this.members = parents.concat(children);
    });
  }

  getFamilyTasks() {
    this.tasksService.getUserTasks(this.parentID).subscribe(result => {
      this.tasks = result;
      this.countCompleteTasks();
    })
  }

  countCompleteTasks() {
    let completedTasks = this.tasks.filter(task => task.status.toLowerCase() == 'complete');
    this.numCompletedTasks = completedTasks.length;
  }

  openMemberModal(event: string = 'create') {
    const modalRef = this.modalService.open(MemberFormComponent);
    modalRef.componentInstance.member = {};
    modalRef.componentInstance.alreadyMember = false;

    modalRef.result.catch(error => {
      console.error(error);
    });
  }

  openTaskModal(event: string = 'create') {
    const modalRef = this.modalService.open(NewTaskFormComponent);
    modalRef.componentInstance.task = {};

    modalRef.result.then((task: Task) => {
      task.userID = this.parentID;
      task.status = "incomplete";
      task.taskRating = 0;
      task.notified = 0;

      this.tasksService.createTask(task).subscribe(result => {
        this.getFamilyTasks();
      })
    }).catch(error => {
      console.error(error);
    });
  }
}
