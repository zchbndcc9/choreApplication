import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TasksDisplayComponent } from './tasks-display/tasks-display.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  declarations: [
    NewTaskFormComponent,
    TasksPageComponent,
    TasksDisplayComponent
  ],
  exports: [
    TasksDisplayComponent,
    NewTaskFormComponent
  ],
  entryComponents: [
    NewTaskFormComponent
  ]
})
export class TasksModule { }
