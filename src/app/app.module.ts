import { TasksDisplayComponent } from './tasks/tasks-display/tasks-display.component';
import { TasksModule } from './tasks/tasks.module';
import { ParentsModule } from './parent/parents.module';
import { MembersModule } from './members/members.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParentComponent } from './parent/containers/parent.component';

import { NewaccountComponent } from './newaccount/newaccount.component';
import { ChildComponent } from './child/child.component';
import { GroundingAppealComponent } from './grounding-appeal/grounding-appeal.component';
import { TaskNotificationComponent } from './tasks/task-notification/task-notification.component';
import { MembersComponent } from './members/containers/members.component';
import { MemberDeleteModalComponent } from './members/components/member-delete-modal/member-delete-modal.component';
import { SharedModule } from './shared/shared.module';
import { EditFamilyComponent } from './edit-family/edit-family.component';


@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LoginComponent,
    NewaccountComponent,
    GroundingAppealComponent,
    NavbarComponent,
    TaskNotificationComponent,
    NavbarComponent,
    MemberDeleteModalComponent,
    EditFamilyComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MembersModule,
    ParentsModule,
    TasksModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule
  ],
  entryComponents: [
    GroundingAppealComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
