import { Child } from './../../../domain/models/child';
import { Task } from '../../../domain/models';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.css']
})
export class NewTaskFormComponent implements OnInit {

  // @Input() children: Child[];
  taskForm: FormGroup;
  task: Task;
  children: Child[];
  errors: any[];

  constructor(
    private fb: FormBuilder, public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: [this.task.taskTitle || '', Validators.required],
      description: [this.task.taskDescript || '', Validators.required],
      deadline: [this.task.deadline || '00-00-0000', [Validators.required, this.validDateValidator]],
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

  validDateValidator(control: AbstractControl) {
    const valid = new Date(control.value) > new Date();
    return valid ? null : {'past deadline': true};
  }

  getAllValidationErrors() {
    this.errors = [];
    Object.keys(this.taskForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.taskForm.get(key).errors;
      const touched = this.taskForm.get(key).touched;
      if (controlErrors && touched) {
        Object.keys(controlErrors).forEach(keyError => {
          let errorMsg = key + " is " + keyError;
          errorMsg = errorMsg.toUpperCase();
          this.errors.push(errorMsg);
        });
      }
    });
  }

}
