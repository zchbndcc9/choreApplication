import { MemberGroundModalComponent } from './components/member-ground-modal/member-ground-modal.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberCardlistComponent } from './components/member-cardlist/member-cardlist.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MembersService } from './members.service';
import { MemberFormComponent } from './components/member-form/member-form.component';
import { MembersComponent } from './containers/members.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewTaskFormComponent } from './components/new-task-form/new-task-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    MembersComponent,
    MemberCardComponent,
    MemberCardlistComponent,
    MemberListComponent,
    MemberFormComponent,
    MemberGroundModalComponent,
    NewTaskFormComponent
  ],
  providers: [
    MembersService
  ],
  exports: [
    MembersComponent
  ],
  entryComponents: [
    MemberFormComponent,
    MemberGroundModalComponent
  ]
})
export class MembersModule { }
