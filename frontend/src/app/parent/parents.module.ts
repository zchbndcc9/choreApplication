import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ParentComponent } from './containers/parent.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsService } from './parents.service';

@NgModule({
  declarations: [
    ParentComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  providers: [
    ParentsService
  ],
  exports: [
    ParentComponent
  ]
})

export class ParentsModule { }
