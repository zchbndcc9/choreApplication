import { AppRoutingModule } from './app-routing.module';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fam.ly';

  constructor() {}

  ngOnInit(){
  }

  shouldLoadNav(): boolean {
    if (window.sessionStorage.getItem('userID')
      && window.sessionStorage.getItem('familyID')
      && window.sessionStorage.getItem('Success')) {
        return true;
      }
      return false;
  }

}


