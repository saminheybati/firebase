import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccessLevelsService} from "../../../services/access-levels.service";

@Component({
  selector: 'app-access-level-title',
  templateUrl: './access-level-title.component.html',
  styleUrls: ['./access-level-title.component.scss']
})
export class AccessLevelTitleComponent implements OnInit {

  selectedAccLvl: any
  title=''

  constructor(public dialogRef: MatDialogRef<AccessLevelTitleComponent>,
              private accessLevelService: AccessLevelsService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {
    this.selectedAccLvl = this.data
    this.title = this.data.title
    console.log("data", this.data)
  }

  saveChanges() {
    this.selectedAccLvl.title=this.title
    this.accessLevelService.updateItem(this.selectedAccLvl.key, this.selectedAccLvl)
      // this.dialogRef.close();
  }
}
