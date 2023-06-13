import {Component, OnInit} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";
import {MatDialog} from "@angular/material/dialog";
import {AccessLevelTitleComponent} from "../access-levels/access-level-title/access-level-title.component";
import {UploadImageComponent} from "./upload-image/upload-image.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayName = 'samin'

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openUploadDialog() {
    this.dialog.open(UploadImageComponent, {
      data: 'sam'
    });
  }
}
