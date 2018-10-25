import { RouterModule, Routes, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginSuccess: boolean;

  users: any[];

  constructor() { }

  ngOnInit() {
    this.users = [
      {username: 'samdotgiles@gmail.com', password: 'password'},
      {username: 'test@test.com', password: 'test'}
    ];
  }

  submit(): void {
    for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      if (this.username === user.username) {
        if (this.password === user.password) {
          this.loginSuccess = true;
          break;
        } else {
          this.loginSuccess = false;
        }
      }
    }
    this.username = '';
    this.password = '';
  }

}
