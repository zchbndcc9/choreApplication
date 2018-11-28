import { FamilyService } from './../../services/family/family.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-family',
  templateUrl: './edit-family.component.html',
  styleUrls: ['./edit-family.component.css']
})
export class EditFamilyComponent implements OnInit {

  address: string;
  lastName: string;
  familyID: number;
  userID: number;
  email: string;
  phone: string;
  registrationDate: string;

  constructor(
    private _familyService: FamilyService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.familyID = JSON.parse(window.sessionStorage.getItem('familyID'));
    this.userID = JSON.parse(window.sessionStorage.getItem('userID'));
    this._familyService.getInfo(this.familyID).subscribe(result => {
      this.address = result.address;
      this.familyID = result.familyID;
      this.email = result.email;
      this.phone = result.phone;
      this.registrationDate = result.registrationDate;
    });
    this.getUser();
  }

  getUser() {
    this._familyService.getUser(this.userID).subscribe(result => {
      this.lastName = result.lastName;
    });
  }

  saveChanges() {
    this._familyService.updateInfo(this.familyID, this.address, this.email, this.phone, this.registrationDate).subscribe(result => {
      this._router.navigateByUrl(`/family/${this.familyID}`);
    });
  }

}
