import { ParentGroundModalComponent } from './components/parent-ground-modal/parent-ground-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParentComponent } from './containers/parent.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsService } from './parents.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TasksService } from 'src/services/tasks/tasks.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ParentComponent,
    ParentGroundModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule
  ],
  providers: [
    ParentsService,
    TasksService
  ],
  exports: [
    ParentComponent,
    ParentGroundModalComponent
  ]
})

export class ParentsModule { }
