import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-delete-modal',
  template: `
    <div>
      <div class="modal-body">
        <h4>Are you sure you want to delete this member?</h4>
      </div>
      <div class="modal-footer justify-content-center">
        <button class="btn" (click)="cancelDelete()">No</button>
        <button class="btn btn-warning" (click)="confirmDelete()">
          Delete em'
        </button>
      </div>
    </div>
  `
})

export class MemberDeleteModalComponent {
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  confirmDelete() {
    this.activeModal.close();
  }

  cancelDelete() {
    this.activeModal.dismiss();
  }
}
