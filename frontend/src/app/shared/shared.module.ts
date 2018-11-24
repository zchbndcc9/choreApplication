import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    RatingComponent,
    ValidationMessagesComponent
  ],
  exports: [
    RatingComponent,
    ValidationMessagesComponent
  ]
})
export class SharedModule { }
