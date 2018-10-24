import { PasswordValidator } from './../validators/password.validator';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Member } from 'src/domain/models/member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  // Allows for a member and form type to be passed to the component
  @Input() member: Member;
  @Input() alreadyMember: boolean;

  memberForm: FormGroup;
  passwordForm: FormGroup;

  // Input dependencies for the component
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.memberForm = this.fb.group({
      firstName: [this.member.firstName || '', Validators.required],
      lastName: [this.member.lastName || '', Validators.required],
      username: [this.member.username || '', Validators.required],
      isParent: [this.member.isParent || false]
    });
    if (!this.alreadyMember) {
      this.passwordForm = this.fb.group(
        {
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        },
        { validator: PasswordValidator.match }
      );
    }
  }

  createMember() {
    this.member = Object.assign({}, this.memberForm.value);
    // Some API call
    // Send data to members table
    this.memberForm.reset();
    if (!this.alreadyMember) {
      this.passwordForm.reset();
    }
  }

}
