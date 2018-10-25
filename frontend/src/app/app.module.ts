import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ParentComponent } from './parent/parent.component';

import { NewaccountComponent } from './newaccount/newaccount.component';
import { ChildComponent } from './child/child.component';


@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LoginComponent,
    NewaccountComponent,
    NavbarComponent,
    ParentComponent,
    MemberFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MemberFormComponent],
})
export class AppModule { }
