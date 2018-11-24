import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ValidationErrors, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent implements OnInit {

  @Input() errors: any[];

  constructor() { }

  ngOnInit() {

  }

}
