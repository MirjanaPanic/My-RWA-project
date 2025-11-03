import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action-dialog',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './confirm-delete-dialog.html',
  styleUrl: './confirm-delete-dialog.css',
})
export class ConfirmActionDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmActionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true); // vraća true ako je korisnik kliknuo Yes
  }

  onCancel() {
    this.dialogRef.close(false); // vraća false ako je korisnik kliknuo Cancel
  }
}
