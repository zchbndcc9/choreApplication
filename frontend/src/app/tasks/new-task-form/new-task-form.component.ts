import { Child } from './../../../domain/models/child';
import { Task } from '../../../domain/models';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.css']
})
export class NewTaskFormComponent implements OnInit {

  taskForm: FormGroup;
  task: Task;
  children: Child[];

  constructor(
    private fb: FormBuilder, public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.children = [
      {
        userID: 5,
        username: 'one',
        firstName: 'sam',
        lastName: 'giles',
        isParent: false,
        rating: 5,
        isGrounded: false,
        infractions: [],
        tasks: []
      },
      {
        userID: 12,
        username: 'two',
        firstName: 'giles',
        lastName: 'sam',
        isParent: false,
        rating: 1,
        isGrounded: false,
        infractions: [],
        tasks: []
      }
    ];

    this.createForm();
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: [this.task.taskTitle || '', Validators.required],
      description: [this.task.taskDescript || '', Validators.required],
      deadline: [this.task.deadline || '00-00-0000', Validators.required],
      award: [this.task.taskAward || '', Validators.required],
      assignedTo: [this.task.assigneeID || '', Validators.required]
    });
  }

  processTask() {
    this.task.assigneeID = +this.taskForm.value.assignedTo;
    this.task.taskTitle = this.taskForm.value.title;
    this.task.taskDescript = this.taskForm.value.description;
    this.task.taskAward = this.taskForm.value.award;
    this.task.deadline = this.taskForm.value.deadline;
    this.activeModal.close(this.task);
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset();
    this.activeModal.close();
  }

}
