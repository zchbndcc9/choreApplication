import { Child } from './../../../domain/models/child';
import { Task } from '../../../domain/models/task';
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
        username: 'one',
        firstName: 'giles',
        lastName: 'sam',
        isParent: false,
        rating: 1,
        isGrounded: false,
        infractions: [],
        tasks: []
      }
    ];
    console.log(this.children);

    this.createForm();
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: [this.task.title || '', Validators.required],
      description: [this.task.description || '', Validators.required],
      deadline: [this.task.deadline || '00-00-0000', Validators.required],
      award: [this.task.award || '', Validators.required]
    });
  }

  processTask() {
    this.activeModal.close(this.taskForm.value);
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset();
    this.activeModal.close();
  }

}
