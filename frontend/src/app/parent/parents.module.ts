import { ParentGroundModalComponent } from './components/parent-ground-modal/parent-ground-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParentComponent } from './containers/parent.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsService } from './parents.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ParentComponent,
    ParentGroundModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [
    ParentsService
  ],
  exports: [
    ParentComponent,
    ParentGroundModalComponent
  ]
})

export class ParentsModule { }
