import { Component, OnInit } from '@angular/core';
// import { Account } from '../../domain/models/account';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {
  // account: Account = {};
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

  constructor() { }

  ngOnInit() {
  }

  createAccount() {
    // this.account.firstName = this.firstName;
    // this.account.lastName = this.lastName;
    // if (this.address2) {
    //   this.account.address = `${this.address1} #${this.address2}, ${this.city}, ${this.state} ${this.zip}`;
    // } else {
    //   this.account.address = `${this.address1}, ${this.city}, ${this.state} ${this.zip}`;
    // }
    // this.account.email = this.email;
    // this.account.password = this.password2;
    // console.log(this.account.firstName);
    // console.log(this.account.lastName);
    // console.log(this.account.address);
    // console.log(this.account.email);
    // console.log(this.account.password);
  }

}
