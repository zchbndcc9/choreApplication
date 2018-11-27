import { Router } from '@angular/router';
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

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    window.sessionStorage.clear();
    this._router.navigateByUrl('/login');
  }

}
