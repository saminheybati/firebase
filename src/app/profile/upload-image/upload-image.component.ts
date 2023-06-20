import {Component, OnInit} from '@angular/core';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


  applyImage() {

  }

  getImageUrl(event: any) {
    event.lastModifiedDate=new Date()
    event.name = 'fileName';
    console.log("event",event?.changingThisBreaksApplicationSecurity as File)
  }
}
