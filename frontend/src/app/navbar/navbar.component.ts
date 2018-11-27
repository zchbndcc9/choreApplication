import { faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faCog = faCog;
  faBell = faBell;

  familyID: string;
  userType: string;

  constructor() { }

  ngOnInit() {
    this.familyID = JSON.parse(window.sessionStorage.getItem('familyID'));
  }
  // if child the only page that should apear is fam.ly

}
