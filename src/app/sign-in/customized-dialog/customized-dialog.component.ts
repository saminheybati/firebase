import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SignInComponent} from "../sign-in.component";


@Component({
  selector: 'app-customized-dialog',
  templateUrl: './customized-dialog.component.html',
  styleUrls: ['./customized-dialog.component.scss']
})
export class CustomizedDialogComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
