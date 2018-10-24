import { PasswordValidator } from './../validators/password.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})

export class MemberFormComponent implements OnInit {

  memberForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    memberType: [false],
    passwordForm: this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: PasswordValidator.match })
  });

  constructor(private fb: FormBuilder) {}

  createMember() {
    JSON.stringify(this.memberForm.value);
    // Some API call
    // Send data to members table
    this.memberForm.reset();
  }
  ngOnInit() {
  }
}
