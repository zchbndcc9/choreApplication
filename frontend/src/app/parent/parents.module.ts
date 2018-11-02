import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsService } from './parents.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ParentsService
  ],
  exports: [
    ParentsModule
  ]
})

export class ParentsModule { }
