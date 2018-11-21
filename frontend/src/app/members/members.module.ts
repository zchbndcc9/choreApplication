import { NavbarComponent } from './../navbar/navbar.component';
import { MemberFormComponent } from './../members/components/member-form/member-form.component';
import { MemberGroundModalComponent } from './components/member-ground-modal/member-ground-modal.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberCardlistComponent } from './components/member-cardlist/member-cardlist.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MembersService } from './members.service';
import { MembersComponent } from './containers/members.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    MemberGroundModalComponent
  ],
  providers: [
    MembersService
  ],
  exports: [
    MembersComponent,
    MemberFormComponent
  ],
  entryComponents: [
    MemberFormComponent,
    MemberGroundModalComponent
  ]
})
export class MembersModule { }
