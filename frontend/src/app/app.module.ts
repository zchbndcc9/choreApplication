import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NewaccountComponent } from './newaccount/newaccount.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewaccountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
