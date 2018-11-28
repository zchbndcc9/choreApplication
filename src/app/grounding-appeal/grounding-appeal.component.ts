import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grounding-appeal',
  templateUrl: './grounding-appeal.component.html',
  styleUrls: ['./grounding-appeal.component.css']
})
export class GroundingAppealComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
