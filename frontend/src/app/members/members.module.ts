import { SharedModule } from './../shared/shared.module';
import { MemberDeleteModalComponent } from './components/member-delete-modal/member-delete-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './../navbar/navbar.component';
import { MemberFormComponent } from './../members/components/member-form/member-form.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberCardlistComponent } from './components/member-cardlist/member-cardlist.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { MembersService } from './members.service';
import { MembersComponent } from './containers/members.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ParentGroundModalComponent } from '../parent/components/parent-ground-modal/parent-ground-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule
  ],
  declarations: [
    MembersComponent,
    MemberCardComponent,
    MemberCardlistComponent,
    MemberListComponent,
    MemberFormComponent
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
    ParentGroundModalComponent,
    MemberDeleteModalComponent
  ]
})
export class MembersModule { }
