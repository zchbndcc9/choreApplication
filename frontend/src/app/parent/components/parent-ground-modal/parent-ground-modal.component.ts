import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-ground-modal',
  template: `
    <div>
      <div class="modal-body">
        <h4>Are you sure you want to ground your child?</h4>
      </div>
      <div class="modal-footer justify-content-center">
        <button class="btn" (click)="cancelGround()">No</button>
        <button class="btn btn-warning" (click)="confirmGround()">Ground em'</button>
      </div>
    </div>
  `,
  styleUrls: ['./parent-ground-modal.component.css']
})

export class ParentGroundModalComponent {
  constructor(
    private activeModal: NgbActiveModal
  ) {}

  confirmGround() {
    this.activeModal.close();
  }

  cancelGround() {
    this.activeModal.dismiss();
  }
}
