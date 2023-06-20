import {Component, OnInit} from '@angular/core';
import {base64ToFile, Dimensions, ImageCroppedEvent, ImageTransform, LoadedImage} from "ngx-image-cropper";
import {FileUpload} from "../../../model/fileUpload";
import {FileUploadService} from "../../../services/file-upload.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  selectedFile: File
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(private uploadService: FileUploadService) {
  }

  ngOnInit(): void {
  }

  applyImage() {
    this.currentFileUpload = new FileUpload(this.selectedFile);
    console.log('this.currentFileUpload', this.currentFileUpload.file.name)
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage ? percentage : 0);
      },
      error => {
        console.log(error);
      }
    );
  }

  getImageUrl(event: any) {
    this.selectedFile = new File([event?.changingThisBreaksApplicationSecurity], "filename")
    console.log("selectedFile", this.selectedFile)
  }
}
