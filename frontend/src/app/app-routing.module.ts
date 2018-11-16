import { LoginComponent } from './login/login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { MembersComponent } from './members/containers/members.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/containers/parent.component';
import { TasksDisplayComponent } from './tasks/tasks-display/tasks-display.component';

const routes: Routes = [
  { path: 'family/:id', component: ParentComponent },
  { path: 'new-account', component: NewaccountComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'family/:id/members', component: MembersComponent },
  { path: 'family/:id/tasks', component: TasksDisplayComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
