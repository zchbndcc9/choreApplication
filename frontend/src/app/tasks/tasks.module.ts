import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllTasksComponent } from './view-all-tasks/view-all-tasks.component';
import { TasksDisplayComponent } from './tasks-display/tasks-display.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [
    NewTaskFormComponent,
    ViewAllTasksComponent,
    TasksDisplayComponent
  ],
  exports: [
    NewTaskFormComponent,
    ViewAllTasksComponent,
    TasksDisplayComponent
  ],
  entryComponents: [
    NewTaskFormComponent
  ]
})
export class TasksModule { }
