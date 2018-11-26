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
    window.sessionStorage.clear();
    console.log('storage cleared');
    console.log(window.sessionStorage.getItem('userID'));
  }

}


