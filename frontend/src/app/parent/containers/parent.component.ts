import { NewTaskFormComponent } from '../../tasks/new-task-form/new-task-form.component';
import { faUsers, faPlus, faClipboardCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { MemberFormComponent } from '../../members/components/member-form/member-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

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

  tasks: any;
  members: any[];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.tasks = [
      {id: 1, name: 'Mow the lawn', member: 'Jimbo', status: 'In Progress'},
      {id: 2, name: 'Take out the trash', member: 'Janette', status: 'Completed'},
      {id: 3, name: 'Run errands', member: 'Jimbo' , status: 'Pending Verification' },
      {id: 4, name: 'Walk the dogs', member: 'Jimbo', status: 'Completed'}
    ];

    this.members = [
      {id: 1, name: 'John', type: 'Parent'},
      {id: 2, name: 'Jane', type: 'Parent'},
      {id: 3, name: 'Jimbo', type: 'Child'},
      {id: 4, name: 'Janette', type: 'Child'}
    ];
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

    modalRef.result.then((result) => {
      // save the task
    }).catch(error => {
      console.error(error);
    });

  }

}
