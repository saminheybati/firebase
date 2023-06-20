import {Component, Inject, OnInit} from '@angular/core';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";
import {FileUpload} from "../../../model/fileUpload";
import {FileUploadService} from "../../../services/file-upload.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataBaseService} from "../../../services/data-base.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  selectedFile: File
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(private uploadService: FileUploadService,
              private service: DataBaseService,
              public dialogRef: MatDialogRef<UploadImageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log("data",data)
  }

  ngOnInit(): void {
  }

  applyImage() {
    this.currentFileUpload = new FileUpload(this.selectedFile);
    console.log('this.currentFileUpload', this.currentFileUpload)
    this.currentFileUpload.name=this.data.id
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage ? percentage : 0);
      },
      error => {
        console.log(error);
      },
    );
  }

  getImageUrl(event: any) {
    console.log("fffffffffffff",event)
    this.selectedFile = new File([event],this.data.id,{type:event.type})
    console.log("selectedFile", this.selectedFile)

  }
}
