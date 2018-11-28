import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordValidator } from '../../password.validator';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Member } from 'src/domain/models/member';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})

export class MemberFormComponent implements OnInit {
  // Allows for a member and form type to be passed to the component
  @Input()
  member: Member;

  @Input()
  alreadyMember: boolean;

  @Output()
  processMember = new EventEmitter<FormGroup>();

  // Allows for a member and form type to be passed to the component
  memberForm: FormGroup;
  passwordForm: FormGroup;

  // Input dependencies for the component
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.memberForm = this.fb.group({
      firstName: [this.member.firstName || '', Validators.required],
      lastName: [this.member.lastName || '', Validators.required],
      username: [this.member.username || '', Validators.required],
      userType: [this.member.userType || 0]
    });

    // Conditional initialization of password form
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

  processMemberInfo() {
    let memberObj = Object.assign({}, this.memberForm.value);

    memberObj.userType = +memberObj.userType;

    if (!this.alreadyMember) {
      memberObj = Object.assign(memberObj, {password: this.passwordForm.controls.password.value});
    }
    this.activeModal.close(memberObj);
    this.resetForm();
  }

  resetForm() {
    this.memberForm.reset();
    if (!this.alreadyMember) {
      this.passwordForm.reset();
    }
    this.activeModal.close();
  }
}
