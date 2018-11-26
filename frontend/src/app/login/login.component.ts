import { ParentsService } from './../parent/parents.service';
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
    protected router: Router,
    protected parentsService: ParentsService
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
        window.sessionStorage.setItem('userID', JSON.stringify(result.userID));
        window.sessionStorage.setItem('familyID', JSON.stringify(result.familyID));
        window.sessionStorage.setItem('Success', JSON.stringify(true));
        this.loginService.getUserDetails(result.userID).subscribe(newResult => {
          window.sessionStorage.setItem('userType', JSON.stringify(newResult.userType));
          if (JSON.parse(newResult.userType)==1) {
            this.router.navigateByUrl(`/family/${result.familyID}`);
          }
          else if (JSON.parse(newResult.userType)==0) {
            this.router.navigateByUrl(`/child/${result.userID}`);
          }
          else {
            this.loginSuccess = false;
          }
        });
      }
      else {
        this.loginSuccess = false;
      }
    });
  }

}
