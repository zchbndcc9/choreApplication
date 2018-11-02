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
import { ParentComponent } from './parent/parent.component';

import { NewaccountComponent } from './newaccount/newaccount.component';
import { ChildComponent } from './child/child.component';
import { MembersComponent } from './members/containers/members.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LoginComponent,
    NewaccountComponent,
    NavbarComponent,
    ParentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MembersModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
