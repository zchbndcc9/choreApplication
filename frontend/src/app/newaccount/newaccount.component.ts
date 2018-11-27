import { LoginService } from './../../services/login/login.service';
import { NewAccountService } from './../../services/new-account/new-account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password1: string;
  password2: string;

  constructor(
    protected newAccountService: NewAccountService,
    protected loginService: LoginService,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.firstName && this.lastName
      && this.address1 && this.city
       && this.state && this.zip
        && this.email && this.password1
         && this.password2
          && (this.password1 === this.password2)) {
      return true;
    }
    return false;
  }

  createAccount() {
    this.newAccountService.createAccount(this.firstName, this.lastName, this.address1, this.address2, this.city, this.state, this.zip, this.email, this.password2).subscribe(result => {
      if (result.Success == "true") {
        this.loginService.login(this.email, this.password2).subscribe(newResult => {
          if (newResult.Success == "true") {
            window.sessionStorage.setItem('userID', JSON.stringify(result.userID));
            window.sessionStorage.setItem('familyID', JSON.stringify(result.familyID));
            window.sessionStorage.setItem('Success', JSON.stringify(true));
            window.sessionStorage.setItem('userType', JSON.stringify(1));
            this.router.navigateByUrl(`/family/${result.familyID}`);
          }
          else {
            alert("There was an error logging in");
          }
        });
      }
      else {
        alert("There was an error creating an account");
      }
    });
  }

}
