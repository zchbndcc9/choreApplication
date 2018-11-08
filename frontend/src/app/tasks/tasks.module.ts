import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    NewTaskFormComponent
  ],
  exports: [
    NewTaskFormComponent
  ],
  entryComponents: [
    NewTaskFormComponent
  ]
})
export class TasksModule { }
