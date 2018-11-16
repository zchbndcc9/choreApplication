import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
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

  constructor(
    protected loginService: LoginService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.currentUser.username
      && this.currentUser.password) {
        return true;
      }
    return false;
  }

  submit(): void {
    this.loginService.login(this.currentUser.username, this.currentUser.password).subscribe(result => {
      if (result.Success == "true") {
        this.loginSuccess = true;
        //authenticate
        this.router.navigateByUrl('/family');
      }
      else {
        this.loginSuccess = false;
      }
    });
  }

}
