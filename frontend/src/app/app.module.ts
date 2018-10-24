import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ParentComponent } from './parent/parent.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NewaccountComponent } from './newaccount/newaccount.component';
import { ChildComponent } from './child/child.component';
import { GroundingAppealComponent } from './grounding-appeal/grounding-appeal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ParentComponent,
    NavbarComponent,
    NewaccountComponent,
    ChildComponent,
    GroundingAppealComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  entryComponents: [
    GroundingAppealComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
