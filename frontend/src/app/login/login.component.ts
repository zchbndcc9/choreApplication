import { RouterModule, Routes, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../domain/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  currentUser: User = {};
  loginSuccess: boolean = true;

  users: User[];

  constructor() { }

  ngOnInit() {
    this.users = [
      {username: 'samdotgiles@gmail.com', password: 'password'},
      {username: 'test@test.com', password: 'test'}
    ];
  }

  validate() {
    if (this.currentUser.username
      && this.currentUser.password) {
        return true;
      }
    return false;
  }

  submit(): void {
    let tempUsername = this.currentUser.username;
    let tempPassword = this.currentUser.password;

    let foundUser = false;
    this.users.forEach(function (user) {
      if (user.username === tempUsername && user.password === tempPassword) {
        foundUser = true;
      }
    });
    if (foundUser) {
      this.loginSuccess = true;
    } else {
      this.loginSuccess = false;
    }
    this.currentUser.username = '';
    this.currentUser.password = '';
  }

}
