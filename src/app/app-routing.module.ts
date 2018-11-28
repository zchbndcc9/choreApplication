import { EditFamilyComponent } from './edit-family/edit-family.component';
import { AuthGuardService } from './../services/auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { NewaccountComponent } from './newaccount/newaccount.component';
import { MembersComponent } from './members/containers/members.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from './parent/containers/parent.component';
import { TasksPageComponent } from './tasks/tasks-page/tasks-page.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [
  { path: 'family/:id', component: ParentComponent, canActivate: [AuthGuardService]  },
  { path: 'new-account', component: NewaccountComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'family/:id/members', component: MembersComponent, canActivate: [AuthGuardService]  },
  { path: 'family/:id/tasks', component: TasksPageComponent, canActivate: [AuthGuardService]  },
  { path: 'child/:id', component: ChildComponent, canActivate: [AuthGuardService]  },
  { path: 'editFamily/:id', component: EditFamilyComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
