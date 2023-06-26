import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-action',
  templateUrl: './confirmation-action.component.html',
  styleUrls: ['./confirmation-action.component.scss']
})
export class ConfirmationActionComponent  {

  constructor( public dialogRef: MatDialogRef<ConfirmationActionComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
