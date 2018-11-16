import { NewAccountService } from './../../services/new-account/new-account.service';
import { Component, OnInit } from '@angular/core';

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
    protected newAccountService: NewAccountService
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
    let result = this.newAccountService.createAccount(this.firstName, this.lastName, this.address1, this.address2, this.city, this.state, this.zip, this.email, this.password2);
    // if (result.Success === true ) {
    //   //create new account and sign into that account
    // }
  }

}
